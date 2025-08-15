import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const productNames: string[] = await req.json();

    if (!Array.isArray(productNames)) {
      return NextResponse.json({ error: 'Invalid payload, expected array of names' }, { status: 400 });
    }

    // Шукаємо товари у базі даних за назвами
    const products = await prisma.product.findMany({
      where: {
        name: { in: productNames },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
