import { useMemo } from "react";
import dynamic from "next/dynamic";

import CountrySelect, { CountrySelectValue } from "@/app/components/CountrySelect"
import Heading from "../heading";

interface LocationProps {
  location?: CountrySelectValue;
  setLocation: (location: CountrySelectValue) => void;
}

const Location: React.FC<LocationProps> = ({
  location,
  setLocation
}) => {
  const Map = useMemo(() => dynamic(() => import("@/app/components/map"), {
    ssr: false
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [location]);
  return (
    <div className="flex flex-col gap-8">
      <Heading title="Where do you want to go?" subtitle="Tell us where you're looking for." />
      <CountrySelect 
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )
}

export default Location