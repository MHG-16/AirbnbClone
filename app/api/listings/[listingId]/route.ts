import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
    listingId?: string;
}

export async function DELETE(request: Request, { params } : { params: IParams}) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if(!listingId || typeof listingId !== 'string') {
        throw new Error("Invalid listing identifier");
    }

    await db.reservation.deleteMany({
        where: {
            listing: {
                id: listingId,
                userId: currentUser.id
            }
        }
    })
    const listings = await db.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id,
        }
    });

    return NextResponse.json(listings);
}