import { CartDTO, CreateCartItemValues } from "./dto/cart.dto";
import axios from "axios";

export const getCart = async (): Promise<CartDTO> => {
    return (await axios.get<CartDTO>('/api/cart')).data;
};

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
    return (await axios.patch<CartDTO>('/api/cart/' + itemId, { quantity })).data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
    return (await axios.delete<CartDTO>('/api/cart/' + id)).data;
}

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
    return (await axios.post<CartDTO>('/api/cart', values)).data;
}
