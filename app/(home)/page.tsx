import getListings from "@/actions/getListings";
import { Container } from "./_components/container";
import EmptyState from "./_components/empty-state";
import ListingCard, { ListingCardSkeleton } from "./_components/listings/listingCard";
import { Suspense } from "react";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset/>;
  }
  return (
    <Container>
      <div className="pt-52 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <Suspense fallback={[...Array(5)].map((index) => <ListingCardSkeleton key={index} />)}>
          {
            listings.map((listing: any) => (
              <ListingCard 
                key={listing.id}
                data={listing}
                currentUser={currentUser}
              />
            ))
          }
        </Suspense>
      </div>
    </Container>
  );
}
