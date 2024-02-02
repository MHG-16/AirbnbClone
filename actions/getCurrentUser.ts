"use server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try{
        const session = await getSession();
        if(!session?.user?.email) {
            return null;
        }

        const currentUser  = await db.user.findUnique({
            where: { email: session.user.email as string },
        })

        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toString(),
            emailVerified: currentUser.emailVerified?.toDateString()
        };
    } catch(error) {
        return null;
    }
}