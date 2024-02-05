"use server";

import { db } from "@/lib/prismadb";

export default async function getListings() {
    try {
        const listings = await db.listing.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        return listings;
    } catch(err: any) {
        throw new Error(err);
    }
}