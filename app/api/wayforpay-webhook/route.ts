import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const merchantSecretKey = process.env.WAYFORPAY_SECRET_KEY!;
    const dataForSign = [
      body.merchantAccount,
      body.orderReference,
      body.amount,
      body.currency,
      body.authCode,
      body.cardPan,
      body.transactionStatus,
      body.reasonCode
    ].join(';');

    const generatedSign = crypto
      .createHash('md5')
      .update(dataForSign + merchantSecretKey)
      .digest('hex');

    if (generatedSign !== body.merchantSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    let newStatus: OrderStatus | null = null;
    switch (body.transactionStatus) {
      case 'Approved':
        newStatus = OrderStatus.SUCCEEDED;
        break;
      case 'Declined':
        newStatus = OrderStatus.CANCELLED;
        break;
      case 'Refunded':
        newStatus = OrderStatus.REFUNDED;
        break;
    }

    if (newStatus) {
      await prisma.order.updateMany({
        where: { paymentId: body.orderReference },
        data: { status: newStatus },
      });
    }

    return NextResponse.json({
      orderReference: body.orderReference,
      status: 'accept'
    });

  } catch (err) {
    console.error('Помилка обробки вебхука WayForPay:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
