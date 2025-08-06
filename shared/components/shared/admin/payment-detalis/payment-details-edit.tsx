'use client'

import { AdminPaymentEdit } from "@/app/actions";
import { Button } from "@/shared/components/ui";
import { PaymentDetails } from "@prisma/client"
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
    payment: PaymentDetails;
}

export const AdminPaymentDetailsEdit: React.FC<Props> = ({payment}) => {

    const [cardKey, setCardKey] = useState(payment.cardKey);
    const [iban, setIban] = useState(payment.iban);
    const [edrpou, setEdrpou] = useState(payment.edrpou);
    const [fopName, setFopName] = useState(payment.fopName);

    const handleDiscountSave = async () => {
        try {

            if (cardKey.length < 1 || iban.length < 1 || edrpou.length < 1 || fopName.length < 1) {
                toast.error('Заповніть всі поля');
                return;
            }

            const editedPaymentDetails = {
                cardKey,
                iban,
                edrpou,
                fopName
            }

            await AdminPaymentEdit(1, editedPaymentDetails);

            toast.success('Промокод збережено');
        } catch (error) {
            console.error('Error saving discount:', error);
            toast.error('Помилка при збереженні промокоду');
            throw error;
        }
    }

    return (
        <div>
            <div className="flex justify-end"><Button onClick={handleDiscountSave}>Зберегти</Button></div>

            <div className="mb-4">
                <label htmlFor="cardKey" className="block text-sm font-medium text-gray-700">
                    Ключ-карта
                </label>
                <input
                    type="text"
                    id="cardKey"
                    value={cardKey}
                    onChange={(e) => setCardKey(e.target.value)}
                    className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="iban" className="block text-sm font-medium text-gray-700">
                    IBAN
                </label>
                <input
                    type="text"
                    id="iban"
                    value={iban}
                    onChange={(e) => setIban(e.target.value)}
                    className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="edrpou" className="block text-sm font-medium text-gray-700">
                    ЄДРПОУ
                </label>
                <input
                    type="text"
                    id="edrpou"
                    value={edrpou}
                    onChange={(e) => setEdrpou(e.target.value)}
                    className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="fopName" className="block text-sm font-medium text-gray-700">
                    ФОП
                </label>
                <input
                    type="text"
                    id="fopName"
                    value={fopName}
                    onChange={(e) => setFopName(e.target.value)}
                    className="mt-1 block w-1/2 p-2 border border-gray-300 rounded-md"
                />
            </div>
        </div>
    )
}
