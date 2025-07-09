import { axiosInstance } from "./instance";

export const getFavorites = async (): Promise<any[]> => {
    return (await axiosInstance.get<number[]>(`${process.env.NEXT_PUBLIC_SITE_URL}/api/favorites`)).data;
};

export const addFavorite = async (productId: number): Promise<void> => {
    await axiosInstance.post(`${process.env.NEXT_PUBLIC_SITE_URL}/api/favorites`, { productId });
};

export const removeFavorite = async (productId: number): Promise<void> => {
    await axiosInstance.delete(`${process.env.NEXT_PUBLIC_SITE_URL}/api/favorites/${productId}`);
};
