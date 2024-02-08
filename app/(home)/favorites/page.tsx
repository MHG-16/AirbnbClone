import { Suspense } from "react";

import getCurrentUser from "@/actions/getCurrentUser";
import getFavoriteListings from "@/actions/getFavoriteListing";
import EmptyState from "@/app/(home)/_components/empty-state";
import FavoritesClient from "./favoriteClient";

export const dynamic = 'force-dynamic';

const FavoritePage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        <EmptyState title="Unauthorized" subtitle="Please log in to view your favorite listings." />;
    }

    if (listings.length === 0) return <EmptyState title="No favorites found" subtitle="Add some to see them here." />;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FavoritesClient listings={listings} currentUser={currentUser}/>
        </Suspense>
    )
}

export default FavoritePage;