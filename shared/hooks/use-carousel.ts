import { useState, useEffect } from "react";
import { Api } from "@/shared/services/api-client";
import { useIsMobile } from "@/shared/hooks";
import { SliderImage } from '@prisma/client';

export const useCarousel = () => {
  const isMobile = useIsMobile();

  const [carousel, setCarousel] = useState<SliderImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (isMobile === null) return;

    const fetchCarouselItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await Api.carousel.getAll(isMobile);
        setCarousel(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselItems();

    const interval = setInterval(fetchCarouselItems, 60000);

    return () => clearInterval(interval);
  }, [isMobile]);

  return {
    carousel,
    loading,
    error,
  };
};
