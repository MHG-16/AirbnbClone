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

export interface IListingParams {
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export async function getListingsByparams(params: IListingParams) {
    try {
        const {
            roomCount,
            guestCount,
            bathroomCount,
            locationValue,
            startDate,
            endDate,
            category,
        } = params;

        let query: any = {};

        if (category) {
            query.category = category
        };

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }
        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        if (locationValue) {
            query.locationValue = locationValue
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: {gte: startDate},
                                startDate: {lte: startDate}
                            },
                            {
                                startDate: {lte: endDate},
                                endDate: {gte: endDate}
                            }
                        ]
                    }
                }
            }
        }

        const listings = await db.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc"
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error)
    }
}