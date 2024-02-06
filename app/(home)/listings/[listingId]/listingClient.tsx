"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import axios from "axios";

import { SafeUser, safeListing, safeReservation } from "@/types";
import { categories } from "@/app/(home)/_components/navbar/categories";
import { Container } from "@/app/(home)/_components/container";
import ListingHeader, { ListingHeaderSkeleton } from "./_components/listing-header";
import { useCountries } from "@/hooks/useCountries";
import ListingInfo from "./_components/listing-info";
import useLoginModal from "@/hooks/useLoginModal";
import toast from "react-hot-toast";
import ListingReservation from "./_components/listing-reservation";
import { Range } from "react-date-range";
import { Skeleton } from "@/components/ui/skeleton";



interface ListingClientProps {
    reservations?: safeReservation[];
    listing: safeListing & {
        user: SafeUser
    };

    currentUser?: SafeUser | null;
}

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
}
const ListingClient: React.FC<ListingClientProps> = ({
    reservations = [],
    listing,
    currentUser
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
        const range = eachDayOfInterval({
            start: new Date(reservation.startDate),
            end: new Date(reservation.endDate)
        });
        
        dates = [...dates, ...range]
    });

    return dates;
  }, [reservations]);

  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = () => {
    startTransition(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
    
        axios.post("/api/reservations", {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing.id
        })
        .then(() => {
            toast.success("Listing reservations updated");
            setDateRange(initialDateRange);
            router.refresh();
        })
        .catch(() => toast.error("Something went wrong"));
      })
  }
  const category = categories.find((item) => item.label === listing.category); 
  const { getByValue } = useCountries();
  const location = getByValue(listing.locationValue);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
        const dayCount = differenceInDays(
            dateRange.endDate,
            dateRange.startDate
        );

        if (dayCount && listing.price) {
            setTotalPrice(dayCount * listing.price);
        } else {
            setTotalPrice(listing.price);
        }
    };
  }, [dateRange.endDate, dateRange.startDate, listing.price])
  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ListingHeader 
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={location}
                    id={listing.id}
                    currentUser={currentUser}
                />
                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                    <ListingInfo 
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        guestCount={listing.guestCount}
                        bathroomCount={listing.bathroomCount}
                        location={location}
                    />
                    <div
                        className="order-first mb-10 md:order-last md:col-span-3"
                    >
                        <ListingReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            onChangeDate={(value) => setDateRange(value)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isPending}
                            disabledDates={disabledDates}
                        />
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}

export const ListingClientSkeleton = () => {
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHeaderSkeleton />
                    <Skeleton className="h-48 w-full bg-slate-500"/>
                </div>
            </div>
        </Container>
    )
}
export default ListingClient