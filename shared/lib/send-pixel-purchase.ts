import fetch from "node-fetch";
import crypto from "crypto";
import { Order } from "@prisma/client";
import { prisma } from "@/prisma/prisma-client";

const META_PIXEL_ID = 1340322010789552;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN!;
const META_API_URL = `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events`;

function hashEmail(email: string) {
  return crypto.createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

export async function sendPurchaseEvent(order: Order | null) {
  try {
    if (!order || typeof order.items !== "string") return;

    let itemsArray: any[] = [];
    try {
      itemsArray = JSON.parse(order.items);
    } catch (e) {
      console.error("Error parsing items JSON:", e);
      return;
    }

    // Масив назв товарів з order
    const productNames = itemsArray.map((item) => item.name);

    // Отримуємо відповідні продукти з БД
    const products = await prisma.product.findMany({
      where: { name: { in: productNames } },
      select: { id: true, name: true, categories: true },
    });

    const productMap = new Map(products.map(p => [p.name, p]));

    // Масив categoryId для пошуку назв категорій
    const categoryIds = Array.from(
      new Set(
        products
          .flatMap(p => p.categories.map(c => c.categoryId))
          .filter(Boolean)
      )
    );

    const categories = await prisma.category.findMany({
      where: { id: { in: categoryIds } },
      select: { id: true, name: true },
    });
    const categoryMap = new Map(categories.map(c => [c.id, c.name]));

    // Формуємо відсортовані масиви для Pixel
    const content_ids = itemsArray.map(item => {
      const product = productMap.get(item.name);
      return product?.id.toString() || "";
    });

    const content_name = itemsArray.map(item => item.name);

    const content_category = itemsArray.map(item => {
        const product = productMap.get(item.name);
        const firstCategoryId = product?.categories?.[0]?.categoryId;
        return firstCategoryId ? categoryMap.get(firstCategoryId) : undefined;
    }).join(", ");


    const eventData = {
      event_name: "Purchase",
      event_time: Math.floor(Date.now() / 1000),
      action_source: "website",
      user_data: {
        em: order.email ? hashEmail(order.email) : undefined,
      },
      custom_data: {
        currency: "UAH",
        value: order.totalAmount,
        content_type: "product",
        num_items: itemsArray.length,
        content_ids,
        content_name: content_name.join(", "),
        content_category,
      },
    };

    const res = await fetch(`${META_API_URL}?access_token=${META_ACCESS_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [eventData] }),
    });
    const json = await res.json();
    console.log("Meta event response:", json);

  } catch (err) {
    console.error("Помилка відправки події Purchase:", err);
  }
}

