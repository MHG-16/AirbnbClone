"use client";

import { SafeUser, safeReservation } from "@/types";
import { Container } from "@/app/(home)/_components/container";
import Heading from "../_components/heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard, { ListingCardSkeleton } from "../_components/listings/listingCard";

interface ReservationsClientProps {
    currentUser?: SafeUser;
    reservations: safeReservation[];
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    currentUser,
    reservations
}) => {
  const router = useRouter();
  const [deletingId, setDeleting] = useState("");

  const onCancel = useCallback((id: string) => {
    setDeleting(id);

    axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success("Reservation was deleted successfully");
            router.refresh();
        })
        .catch(() => toast.error("Failed to delete the reservation"))
        .finally(() => setDeleting(""));
  }, [router]);

  return (
    <Container>
        <Heading title="Reservations" subtitle="Your Reservations Settings" />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {reservations.map((reservation) => (
                <ListingCard
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel="Cancel guest reservation"
                    currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export const ReservationsSkeleton = () => {
    return (
        <Container>
            <Heading title="Reservations" subtitle="Your Reservations Settings" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {[...Array(5)].map((index) => (
                    <ListingCardSkeleton key={index} />
                ))}
            </div>
        </Container>
    )
}
export default ReservationsClient