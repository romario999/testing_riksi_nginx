"use client";

import { useEffect } from "react";

interface FacebookViewContentProps {
    productId: number;
    productName: string;
    categoryIds: string | undefined;
    price: number;
}

declare global {
    interface Window {
        fbq?: (...args: any[]) => void;
        _lastTrackedProductId?: number;
    }
}

const PixelProductView: React.FC<FacebookViewContentProps> = ({
  productId,
  productName,
  categoryIds,
  price,
}) => {
  useEffect(() => {
    if (
        typeof window !== "undefined" &&
        window.fbq &&
        window._lastTrackedProductId !== productId
    ) {
        window.fbq("track", "ViewContent", {
            content_name: productName,
            content_ids: [String(productId)],
            content_type: "product",
            content_category: categoryIds,
            value: price.toFixed(2),
            currency: "UAH",
        });
        window._lastTrackedProductId = productId;
    }
  }, [productId, productName, categoryIds, price]);

  return null;
};

export default PixelProductView;
