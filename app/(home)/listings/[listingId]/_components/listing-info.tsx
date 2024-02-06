import { IconType } from "react-icons";

import Avatar from "@/app/(home)/_components/avatar";
import { SafeUser } from "@/types"
import ListingCategory from "./listing-category";
import Map from "@/app/components/map";

interface ListingInfoProps {
    user?: SafeUser;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category?: {
        icon: IconType;
        label: string;
        description: string;
    };
    location?: {
        value: string;
        label: string;
        flag: string;
        latlng: [number, number];
        region: string;
    };

}


const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    location
}) => {
  const coordinates = location?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8 pb-8">
        <div className="flex flex-col gap-2">
            <div className="text-xl font-semibold flex flex-row items-center gap-2">
                <div>Hosted by {user?.name}</div>
                <Avatar src={user?.image} />
            </div>
            <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                <div>
                    {guestCount} guest(s)
                </div>
                <div>
                    {roomCount} room(s)
                </div>
                <div>
                    { bathroomCount } restroom(s)
                </div>
            </div>
        </div>
        <hr />
        {category && (
            <ListingCategory
                Icon={category.icon}
                label={category.label}
                description={category.description}
            />
        )}
        <hr />
        <div className="text-lg font-light text-neutral-500">
            {description}
        </div>
        <hr />
        <Map center={coordinates} />
    </div>
  )
}

export default ListingInfo