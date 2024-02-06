import { NextResponse } from "next/server";

import { db } from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        throw new Error("Unauthorizated");
    }

    const body = await req.json();

    const {
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body;

    if(!listingId || !startDate || !endDate || !totalPrice) {
        throw new Error("Invalid listing data");
    }

    const listing_reservation = await db.listing.update({
        where: {
            id: listingId,
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    });

    return NextResponse.json(listing_reservation);
}