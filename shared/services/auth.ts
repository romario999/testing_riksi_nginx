import { User } from "@prisma/client";
import { axiosInstance } from "./instance";

export const getMe = async () => {
    const {data} = await axiosInstance.get<User>('/api/auth/me');

    return data;
}
