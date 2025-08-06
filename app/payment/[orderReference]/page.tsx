import { notFound } from 'next/navigation';
import { prisma } from '@/prisma/prisma-client';
import { PaymentTypeBlocks } from '@/shared/components/shared/payment-type-blocks';
import { generateOptimizedMetadata } from '@/shared/lib';

type OrderItems = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    productItemId: number;
    imageUrl: string;
    sku: string;
    productUrl: string;
    size: string;
}

export async function generateMetadata() {
  return generateOptimizedMetadata({ payment: true });
}

export default async function PaymentPage({ params }: { params: { orderReference: string } }) {
    const order = await prisma.order.findUnique({
        where: { id: Number(params.orderReference) },
    });

    const paymentDetails = await prisma.paymentDetails.findFirst({
        where: { id: 1 },
    });

    let items: OrderItems[] = [];
    if (typeof order?.items === 'string') {
        try {
            items = JSON.parse(order.items);
        } catch (e) {
            console.error('Error parsing items JSON:', e);
        }
    }

    if (!order) return notFound();

    return (
        <main className="max-w-3xl mx-auto py-14 px-6">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-gray-900">
                    Оплата замовлення №{order.id}
                </h1>
                <div className="text-lg text-gray-600 flex flex-col my-3">
                    <span>Спосіб оплати: <span className="font-semibold text-black">{order.paymentType}</span></span>
                    <span>Сума до сплати: <span className="font-semibold text-black">{order.paymentType === 'Передплата' ? order.totalAmount : 200} грн</span></span>
                    <span className="font-semibold  text-[14px]">
                        При повній оплаті: 5% знижки за реквізитами або 3% через WayForPay.
                    </span>

                </div>
                <p className="text-gray-500 mt-1">Оберіть зручний спосіб оплати</p>
            </div>

            <section className="my-12">
                <h2 className="text-xl font-semibold mb-4">Товари у замовленні</h2>
                <ul className="space-y-4">
                    {items.map((item) => (
                    <li
                        key={item.id}
                        className="flex items-center gap-4 p-3 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
                    >
                        <a href={item.productUrl} target="_blank" className="shrink-0">
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md border"
                        />
                        </a>

                        <div className="flex-1">
                        <a
                            href={item.productUrl}
                            target="_blank"
                            className="text-sm font-medium text-gray-900 hover:underline line-clamp-1"
                        >
                            {item.name}
                        </a>
                        <div className="text-xs text-gray-500 mt-0.5">
                            Розмір: {item.size} · Кількість: {item.quantity}
                        </div>
                        </div>

                        <div className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                        {item.price} грн
                        </div>
                    </li>
                    ))}
                </ul>
            </section>

            <PaymentTypeBlocks paymentType={order.paymentType} fullName={order.fullName} paymentUrl={order.paymentUrl} totalAmount={order.totalAmount} paymentDetails={paymentDetails} />

        </main>
    );
}
