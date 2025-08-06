import { prisma } from "@/prisma/prisma-client";
import { AdminPaymentDetailsEdit } from "@/shared/components/shared/admin/payment-detalis/payment-details-edit";

export default async function PaymentDetailsPage() {

    const payment = await prisma.paymentDetails.findFirst({
        where: { id: 1 },
    });

    if (!payment) {
        return <div>Дані не знайдено</div>
    }

    return (
        <div>
            <AdminPaymentDetailsEdit payment={payment} />
        </div>
    );
}
