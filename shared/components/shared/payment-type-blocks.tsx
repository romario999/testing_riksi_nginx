'use client'

import { useState } from "react";
import { Banknote, Copy, CreditCard, Check } from "lucide-react";
import { Button } from "../ui";
import Link from "next/link";
import { PaymentDetails } from "@prisma/client";

export const PaymentTypeBlocks = ({
  paymentType,
  fullName,
  paymentUrl,
  totalAmount,
  paymentDetails
}: {
  paymentType: string;
  fullName: string;
  paymentUrl: string;
  totalAmount: number;
  paymentDetails: PaymentDetails | null
}) => {
  const [selected, setSelected] = useState<'bank' | 'wayforpay' | null>('bank');
  const [copied, setCopied] = useState(false);

  const KEYCARD = paymentDetails?.cardKey || '';
  const IBAN = paymentDetails?.iban || '';
  const EDRPOU = paymentDetails?.edrpou || '';
  const RECEIVER = paymentDetails?.fopName || '';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(KEYCARD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Перемикач методів */}
      <div className="flex justify-center gap-4 mb-4">
        <Button
          variant={selected === 'bank' ? 'default' : 'outline'}
          onClick={() => setSelected('bank')}
        >
          За реквізитами
        </Button>
        <Button
          variant={selected === 'wayforpay' ? 'default' : 'outline'}
          onClick={() => setSelected('wayforpay')}
        >
          Онлайн WayForPay
        </Button>
      </div>

      {/* Вибраний метод */}
      {selected === 'bank' && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all">
          <div className="flex items-center gap-3 mb-4">
            <Banknote className="w-6 h-6 text-green-600" />
            <h2 className="text-lg font-semibold">Оплата за реквізитами</h2>
          </div>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li className="flex items-center gap-2 relative">
              <strong>Карта-ключ:</strong>
              <span>{KEYCARD}</span>
              <button
                onClick={handleCopy}
                className="text-blue-500 hover:text-blue-700 transition"
                title="Скопіювати"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </li>
            <li><strong>ЄДРПОУ:</strong> {EDRPOU}</li>
            <li><strong>IBAN:</strong> {IBAN}</li>
            <li><strong>Отримувач:</strong> {RECEIVER}</li>
            <li><strong>Призначення:</strong> Оплата замовлення {fullName}</li>
            {paymentType === 'Передплата' && (
              <li>
                <strong>До сплати:</strong> {Math.floor(totalAmount * 0.95)} грн (з урахуванням 5% знижки за реквізитами) + комісія банку
              </li>
            )}
            <li>
              <span>Після оплати скиньте, будь ласка, розгорнуту квитанцію про оплату і вкажіть ваші дані: місто, ПІБ, номер телефону, номер склада Нової Пошти.</span>
            </li>
          </ul>
        </div>
      )}

      {selected === 'wayforpay' && (
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-6 shadow-md transition-all">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold">Онлайн оплата через WayForPay</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Швидка та безпечна онлайн-оплата вашого замовлення.
          </p>
          <Link href={paymentUrl}>
            <Button type="button" variant="default" className="w-full mt-auto">
              Оплатити через WayForPay
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

