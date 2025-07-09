import { Cart } from "@prisma/client";
import { axiosInstance } from "./instance"
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto";

export const getCart = async (): Promise<CartDTO> => {
    return (await axiosInstance.get<CartDTO>('/cart')).data;
};

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
    return (await axiosInstance.patch<CartDTO>(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cart/` + itemId, { quantity })).data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
    return (await axiosInstance.delete<CartDTO>(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cart/` + id)).data;
}

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
    return (await axiosInstance.post<CartDTO>(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cart`, values)).data;
}