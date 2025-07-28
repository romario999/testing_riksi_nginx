// app/api/check-all-pending-orders/route.ts

import { prisma } from '@/prisma/prisma-client';
import { checkPaymentStatus } from '@/shared/lib/check-payment-status';
import { OrderStatus } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const pendingOrders = await prisma.order.findMany({
            where: {
                status: 'PENDING',
                paymentId: { not: null },
            },
        });

        const results = await Promise.all(
            pendingOrders.map(async (order) => {
                const status = await checkPaymentStatus(order.paymentId || '');
                if (status === 'paid') {
                    await prisma.order.update({
                        where: { id: order.id },
                        data: { status: OrderStatus.SUCCEEDED },
                    });
                    return { id: order.id, updated: true, newStatus: 'SUCCEEDED' };
                }

                if (status === 'failed') {
                    await prisma.order.update({
                        where: { id: order.id },
                        data: { status: OrderStatus.CANCELLED },
                    });
                    return { id: order.id, updated: true, newStatus: 'CANCELLED' };
                }

                return { id: order.id, updated: false, newStatus: 'PENDING' };
            })
        );

        return NextResponse.json({ success: true, results });
    } catch (err) {
        console.error('Помилка перевірки оплат:', err);
        return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
    }
}
