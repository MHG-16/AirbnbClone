"use client";

import { SafeUser, safeListing } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Container } from "@/app//(home)/_components/container";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../_components/heading";
import ListingCard, { ListingCardSkeleton } from "../_components/listings/listingCard";

interface PropertiesClientProps {
    properties: safeListing[];
    currentUser: SafeUser
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    properties,
    currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeleteId] = useState("");

  const onCancel = useCallback((id: string) => {
    setDeleteId(id);

    axios.delete("/api/listings/" + id)
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
            title="Propertirs"
            subtitle="List of your properties"
        />
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            { properties.map((properties) => (
                <ListingCard 
                    key={properties.id}
                    data={properties}
                    actionId={properties.id}
                    onAction={onCancel}
                    disabled={deletingId === properties.id}
                    actionLabel="Delete property"
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

export default PropertiesClient