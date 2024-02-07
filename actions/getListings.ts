"use server";

import { db } from "@/lib/prismadb";

export default async function getListings() {
    try {
        const listings = await db.listing.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }));

        return safeListings;
    } catch(err: any) {
        throw new Error(err);
    }
}

export async function getListingsByUserId(userId: string) {
    try {
        const listings = await db.listing.findMany({
            where: { userId: userId },
            orderBy: {
                createdAt: "desc"
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }));

        return safeListings;
    } catch(err: any) {
        throw new Error(err);
    }
}