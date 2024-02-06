import getCurrentUser from "@/actions/getCurrentUser";
import EmptyState from "../_components/empty-state";
import getReservations from "@/actions/getReservation";
import ReservationsClient, { ReservationsSkeleton } from "./reservationsClient";
import { Suspense } from "react";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <EmptyState title="Unauthorized" subtitle="You must be logged in to view this page." />
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    });

    if (reservations.length === 0) {
        return <EmptyState title="No reservations founds" subtitle="It seems that you don't have any reservation yet."/>;
    }

    return (
        <Suspense fallback={<ReservationsSkeleton />}>
            <ReservationsClient 
            reservations={reservations}
            currentUser={currentUser}
            />
        </Suspense>
    )
}

export default ReservationsPage;