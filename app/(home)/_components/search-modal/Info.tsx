import React from 'react'
import Heading from '../heading'
import Counter from '@/app/components/input/counter'


interface InfoProps {
    guestCount: number;
    bathroomCount: number;
    roomCount: number;
    setBathroomCount: (value: number) => void;
    setRoomCount: (value: number) => void;
    setGuestCount: (guestCount: number) => void;
}
const Info: React.FC<InfoProps> = ({
    guestCount,
    roomCount,
    bathroomCount,
    setGuestCount,
    setRoomCount,
    setBathroomCount,
}) => {
  return (
    <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place" />
        <Counter title="Guests" subtitle="How many people are coming?" value={guestCount} onChange={(value) => setGuestCount(value)}/>
        <Counter title="Rooms" subtitle="How many rooms do you need?" value={roomCount} onChange={(value) => setRoomCount(value)}/> 
        <Counter title="Guests" subtitle="How many bathroom do you need?" value={bathroomCount} onChange={(value) => setBathroomCount(value)}/>  
    </div>
  )
}

export default Info