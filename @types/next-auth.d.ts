import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import type { UserRole } from "@prisma/client";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            image: string
            name: string;
            role: UserRole;
        }
    }

    interface User extends DefaultUser {
        id: number;
        role: UserRole;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        role: UserRole;
    }
}