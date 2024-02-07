"use client";

import { SafeUser, safeListing } from "@/types";
import { Container } from "../_components/container";
import Heading from "../_components/heading";
import ListingCard from "../_components/listings/listingCard";

interface FavoriteClientProps {
    listings: safeListing[];
    currentUser? : SafeUser | null;
}

const FavoritesClient:React.FC<FavoriteClientProps> = ({
    listings,
    currentUser
}) => {
  return (
    <Container>
        <Heading title="Favorites" subtitle="Favorites settings" />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
            <ListingCard 
                key={listing.id}
                currentUser={currentUser}
                data={listing}
            />
        ))}
        </div>
    </Container>
  )
}

export default FavoritesClient