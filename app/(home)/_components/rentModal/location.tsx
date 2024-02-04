import React, { useMemo } from 'react'
import Heading from '../heading'
import CountrySelect, { CountrySelectValue } from '@/app/components/CountrySelect'
import dynamic from 'next/dynamic';

interface LocationProps {
  setCustomValue: (id: string, value: any) => void;
  location?: CountrySelectValue
}
const Location:  React.FC<LocationProps> = ({setCustomValue, location}) => {
  const Map = useMemo(() => dynamic(() => import('@/app/components/map'), {
    ssr: false,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [location]);
  
  return (
    <div className="flex flex-col gap-8">
        <Heading 
            title="Where is your location"
            subtitle='Help guests to find the location'
        />
        <CountrySelect 
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map 
          center={location?.latlng}
        />
    </div>
  )
}

export default Location