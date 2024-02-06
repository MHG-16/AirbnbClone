import HeartButton from "@/app/(home)/_components/HeartButton";
import Heading from "@/app/(home)/_components/heading";
import { Skeleton } from "@/components/ui/skeleton";
import { SafeUser } from "@/types";
import Image from "next/image";
import React from "react";

interface ListingHeaderProps {
    title: string;
    imageSrc: string;
    locationValue?: {
        value: string;
        label: string;
        flag: string;
        latlng: [number, number];
        region: string;
    };
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({
    title,
    imageSrc,
    locationValue: location,
    id,
    currentUser
}) => {
  return (
    <div>
        <Heading 
            title={title}
            subtitle={`${location?.region}, ${location?.label}`}
        />
        <div className="mt-1 w-full h-[60vh] overflow-hidden rounded-xl relative">
            <Image 
                fill
                alt="image"
                src={imageSrc}
                className="object-cover w-full"
            />
            <div className="absolute top-5 right-5">
                <HeartButton 
                    listingId={id}
                    currentUser={currentUser}
                />
            </div>
        </div>
    </div>
  )
}

export const ListingHeaderSkeleton = () => {
    return(
        <div>
            <Skeleton className="w-full h-8 bg-slate-500"/>
            <div className="mt-1 w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Skeleton className="w-full h-full bg-slate-500" />
            </div>
        </div>
    )
}
export default ListingHeader