"use client";

import { useCountries } from "@/hooks/useCountries";
import useSearchModal from "@/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
    const searchModal = useSearchModal();
    const params = useSearchParams();

    const { getByValue } = useCountries();

    const locationValue = params?.get("locationValue");
    const startDate = params?.get("startDate");
    const endDate = params?.get("endDate");
    const guestCount = params?.get("guestCount");

    const locationLabel = useMemo(() => {
        if(locationValue) {
            return getByValue(locationValue as string)?.label;
        }

        return "Anywhere"
    }, [locationValue, getByValue]);

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            let ndays = differenceInDays(end, start);

            if (ndays === 0) {
                ndays = 1
            }

            return `${ndays} days`;
        }

        return `Any week`
    },[endDate, startDate]);

    const guestLabel = useMemo(() => {
        if (guestCount) {
            return guestCount === "1" ? "1 guest" : `${guestCount} guests` ;
        }

        return "Add guests";
    }, [guestCount])
    return (
        <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer" onClick={searchModal.onOpen}>
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    {locationLabel}
                </div>
                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                    {durationLabel}
                </div>
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block">
                        {guestLabel}
                    </div>
                    <div className="p-2 bg-rose-500 rounded-full text-white">
                        <BiSearch size={16} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;