import { Container } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { ProductForm } from "@/shared/components/shared/product-form";
import { RecommendedProducts } from "@/shared/components/shared/recommended-products";
import { generateOptimizedMetadata } from "@/shared/lib";
import PixelProductView from "@/shared/components/shared/pixel-product-view";

export async function generateMetadata({ params }: { params: { productLink: string } }) {
  return generateOptimizedMetadata({ productLink: params.productLink });
}

export default async function ProductPage({ params: { productLink } }: { params: { productLink: string } }) {
  const product = await prisma.product.findUnique({
    where: { productUrl: String(productLink) },
    include: {
      categories: {
        include: {
          product: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
      complects: {
        include: {
          products: true,
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  let category = null;
  const firstCategoryId = product.categories[0]?.categoryId;
  if (firstCategoryId) {
    category = await prisma.category.findUnique({
      where: { id: firstCategoryId },
      select: { id: true, categoryUrl: true, name: true, subcategories: true },
    });
  }

  return (
    <Container className="flex flex-col px-1 my-5 ml:my-10 sm:px-10 pb-10">
      <PixelProductView productId={product.id} productName={product.name} categoryIds={category?.name} price={product.price} />
      <ProductForm product={product} category={category} />
      <hr />
      <RecommendedProducts productId={product.id} category={category?.id} />
    </Container>
  );
}
