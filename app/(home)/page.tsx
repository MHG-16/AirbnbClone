import { Suspense } from "react";

import getListings, { IListingParams, getListingsByparams } from "@/actions/getListings";
import { Container } from "./_components/container";
import EmptyState from "./_components/empty-state";
import ListingCard, { ListingCardSkeleton } from "./_components/listings/listingCard";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  searchParams: IListingParams
};
export default async function Home({searchParams} : IParams) {
  const listings = await getListingsByparams(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset/>;
  }
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
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
