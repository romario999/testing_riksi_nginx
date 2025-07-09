import { useState, useEffect } from "react";
import { Api } from "@/shared/services/api-client";
import { BannerImage } from "@prisma/client";
import { useIsMobile } from "@/shared/hooks";

export const useBanner = () => {
  const isMobile = useIsMobile();

  const [banner, setBanner] = useState<BannerImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (isMobile === null) {
      // Чекаємо, доки визначиться isMobile
      return;
    }

    const fetchBannerItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await Api.banner.getAll(isMobile);
        setBanner(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerItems();
  }, [isMobile]);

  return {
    banner,
    loading,
    error,
  };
};
