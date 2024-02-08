import getCurrentUser from "@/actions/getCurrentUser";
import EmptyState from "../_components/empty-state";
import { getListingsByUserId } from "@/actions/getListings";
import { Container } from "../_components/container";
import PropertiesClient from "./propertiesClient";

export const dynamic = 'force-dynamic';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if(!currentUser) return <EmptyState title="Unauthorizated" subtitle="Please log in to see properties." />;
  // Get the list of all properties.
  const properties = await getListingsByUserId(currentUser.id);

  if (properties.length === 0) return <EmptyState title="No properties found." subtitle="You seems look like you haven't reserved any trips" />;
  return (
    <Container>
        <PropertiesClient 
            properties={properties}
            currentUser={currentUser}
        />
    </Container>
  )
}

export default PropertiesPage