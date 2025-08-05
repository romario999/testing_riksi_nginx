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
	    cache: "no-store",
        });

        const result = await response.json();

        console.log('WayForPay response:', result);

        switch(result.transactionStatus) {
            case "Approved":
            case "Successful":
                return "paid";
            case "Declined":
            case "Expired":
                return "failed";
            case "Refunded":
                return "refunded";
            default:
                return "pending";
        }

    } catch (error) {
        console.error("Помилка при перевірці статусу платежу:", error);
        return "error";
    }
};
