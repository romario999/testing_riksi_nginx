import { User } from "@prisma/client";
import { axiosInstance } from "./instance";

export const getMe = async () => {
    const {data} = await axiosInstance.get<User>(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/me`);

    return data;
}