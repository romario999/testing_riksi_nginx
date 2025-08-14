import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        items: true,
        categories: true,
        subcategories: true,
      },
    });

    // 2. Заголовки CSV
    const headers = [
      "id",
      "title",
      "description",
      "availability",
      "condition",
      "price",
      "link",
      "image_link",
      "brand",
      "mpn",
      "color",
      "size",
      "age_group",
      "gender",
      "item_group_id",
    ];

    const rows: string[] = [];

    for (const product of products) {
      const availability = product.stock ? "in stock" : "out of stock";
      const condition = "new";
      const price = `${product.price.toFixed(2)} ${product.currency}`;
      const link = `https://riksi.com.ua/product/${product.productUrl}`;
      let image_link = product.imageUrl?.[0] || "";

      if (image_link && !image_link.startsWith("http")) {
        image_link = `https://riksi.com.ua${image_link}`;
      }

      const brand = "RIKSI";
      const mpn = String(product.id);
      const item_group_id = `GROUP_${product.id}`;
      const description = product.description
          ?.replace(/<[^>]+>/g, "") // прибираємо HTML-теги
          .replace(/&nbsp;/g, " ")  // нерозривний пробіл
          .replace(/&#39;/g, "'")   // апостроф
          .replace(/&deg;/g, "°")   // градус
          .replace(/&ndash;/g, "–") // середнє тире
          .replace(/"/g, '""')      // подвійні лапки
          .trim() || "";

      const sizes = product.items
        ?.map((item) => item.size?.trim())
        .filter((size) => size)
        .join("/") || "";

      const row = [
        String(product.id),
        `"${product.name}"`,
        `"${description}"`,
        availability,
        condition,
        price,
        link,
        image_link,
        brand,
        mpn,
        product.color || "",
        sizes,
        "adult",
        "female",
        item_group_id,
      ];

      rows.push(row.join(","));
    }

    // 4. Формуємо CSV
    const csvContent = [headers.join(","), ...rows].join("\n");

    // 5. Запис у public/catalog.csv
    const filePath = path.join(process.cwd(), "public", "uploads", "catalog.csv");
    await writeFile(filePath, csvContent, "utf8");

    return NextResponse.json({ message: "CSV feed generated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate CSV" }, { status: 500 });
  }
}
