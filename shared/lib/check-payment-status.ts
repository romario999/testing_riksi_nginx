import CryptoJS from 'crypto-js';

const merchantAccount = process.env.NEXT_PUBLIC_WAYFORPAY_MERCHANT_ACCOUNT;
const secretKey = process.env.NEXT_PUBLIC_WAYFORPAY_SECRET_KEY ?? '';

const generateSignature = (orderReference: string): string => {
    const stringToSign = `${merchantAccount};${orderReference}`;
    return CryptoJS.HmacMD5(stringToSign, secretKey).toString(CryptoJS.enc.Hex);
};

export const checkPaymentStatus = async (orderReference: string) => {
    const payload = {
        transactionType: "CHECK_STATUS",
        merchantAccount,
        orderReference,
        merchantSignature: generateSignature(orderReference),
        apiVersion: "1"
    };

    try {
        const response = await fetch("https://api.wayforpay.com/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        console.log('WayForPay response:', result);

        switch(result.reasonCode) {
            case 1100: // успішно оброблено
                switch(result.transactionStatus) {
                    case "Approved":
                        return "paid";
                    case "Declined":
                    case "Expired":
                        return "failed";
                    default:
                        return "pending";
                }
            case 1124: // Cardholder session expired
            case 1123: // Payment cancelled by client
                return "failed";
            // Можеш додати інші case якщо є сенс
            default:
                return "error";
        }

    } catch (error) {
        console.error("Помилка при перевірці статусу платежу:", error);
        return "error";
    }
};
