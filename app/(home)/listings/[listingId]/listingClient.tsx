"use client";
import { Reservation } from "@prisma/client";

import { SafeUser, safeListing } from "@/types";
import { categories } from "@/app/(home)/_components/navbar/categories";
import { Container } from "@/app/(home)/_components/container";
import ListingHeader from "./_components/listing-header";
import { useCountries } from "@/hooks/useCountries";
import ListingInfo from "./_components/listing-info";

interface ListingClientProps {
    reservations?: Reservation[];
    listing: safeListing & {
        user: SafeUser
    };

    currentUser?: SafeUser | null;
}
const ListingClient: React.FC<ListingClientProps> = ({
    reservations,
    listing,
    currentUser
}) => {
  const category = categories.find((item) => item.label === listing.category); 
  const { getByValue } = useCountries();
  const location = getByValue(listing.locationValue);
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
                </div>
            </div>
        </div>
    </Container>
  )
}

export default ListingClient