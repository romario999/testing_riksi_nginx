import { useState, useEffect } from "react";
import { Api } from "@/shared/services/api-client";
import { Category, Subcategory } from "@prisma/client";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const [cats, subs] = await Promise.all([
          Api.categories.getAll(),
          Api.subcategories.getAll(),
        ]);
        setCategories(cats);
        setSubcategories(subs);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndSubcategories();

    const interval = setInterval(fetchCategoriesAndSubcategories, 60000);

    return () => clearInterval(interval);
  }, []);

  return {
    categories,
    subcategories,
    loading,
    error,
  };
};
