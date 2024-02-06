"use client";

import { useRouter } from "next/navigation";

import { SafeUser, safeReservation } from "@/types"
import { Container } from "@/app/(home)/_components/container";
import Heading from "../_components/heading";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard, { ListingCardSkeleton } from "../_components/listings/listingCard";
import { Skeleton } from "@/components/ui/skeleton";

interface TripsClientProps {
    reservations: safeReservation[];
    currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeleteId] = useState("");

  const onCancel = useCallback((id: string) => {
    setDeleteId(id);

    axios.delete("/api/reservations/" + id)
    .then(() => {
        toast.success("Success");
        router.refresh();
    })
    .catch((error) => toast.error(error?.response?.data?.error))
    .finally(() => setDeleteId(""));
  }, [router]);
  return (
    <Container>
        <Heading 
            title="Trips"
            subtitle="Where you've been and where you want to go"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            { reservations.map((reservation) => (
                <ListingCard 
                    key={reservation.id}
                    data={reservation.listing}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel="Cancel reservation"
                    currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export const TripsSkeleton = () => {
    return (
        <Container>
            <Heading 
                title="Trips"
                subtitle="Where you've been and where you want to go"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {[...Array(5)].map((index) => (
                    <ListingCardSkeleton key={index}/>
                ))}
            </div>
        </Container>
    )
}
export default TripsClient