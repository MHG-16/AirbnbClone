import getListingById from "@/actions/getListingById";
import EmptyState from "@/app/(home)/_components/empty-state";
import getCurrentUser from "@/actions/getCurrentUser";
import ListingClient from "./listingClient";
import getReservations from "@/actions/getReservation";

interface IParams {
  listingId?: string;
}

export const dynamic = 'force-dynamic';

const ListingPage = async ({ params } : { params: IParams}) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }
  return (
    <div>
      <ListingClient listing={listing} currentUser={currentUser} reservations={reservations}/>
    </div>
  )
}

export default ListingPage