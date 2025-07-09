import { useState, useEffect } from "react";
import { Api } from "@/shared/services/api-client";
import { FooterPage } from "@prisma/client";

export const useFooter = () => {
  const [footerPages, setFooterPages] = useState<FooterPage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchFooterPages = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await Api.footerPages.getAll();
        setFooterPages(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterPages();

    const interval = setInterval(fetchFooterPages, 60000);

    return () => clearInterval(interval);
  }, []);

  return {
    footerPages,
    loading,
    error,
  };
};
