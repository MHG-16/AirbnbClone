import Heading from "@/app/(home)/_components/heading";
import Counter from "@/app/components/input/counter";

interface InfoProps {
    setCustomValue: (id: string, value: any) => void;
    guestCount: number;
    roomCount: number;
    bathroomCount: number
}

const Info: React.FC<InfoProps> = ({
    setCustomValue,
    guestCount,
    roomCount,
    bathroomCount
}) => {

  return (
    <div className="flex flex-col gap-8">
        <Heading
            title="Share some basic information about your place"
            subtitle="What amenities do you have?"
        />
        <Counter 
            title="Number of guests"
            subtitle="How many guests do you allow?"
            value={guestCount}
            onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter 
            title="Number of rooms"
            subtitle="How many rooms do you have?"
            value={roomCount}
            onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter 
            title="Number of bathrooms"
            subtitle="How many bathrooms do you have?"
            value={bathroomCount}
            onChange={(value) => setCustomValue("bathroomCount", value)}
        />
    </div>
  )
}

export default Info