import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
    reservationId?: string;
}

export async function DELETE(
    request: Request,
    { params } : { params: IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        throw new Error("Unauthorizated");
    }

    const { reservationId } = params;

    if(!reservationId || typeof reservationId !== "string") {
        throw new Error("Invalid reservation identifier");
    }

    const reservation = await db.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id},
                { listing: { userId: currentUser.id }}
            ]
        }
    });

    return NextResponse.json(reservation);
}