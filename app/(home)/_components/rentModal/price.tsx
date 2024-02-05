import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import Heading from "../heading";
import Input from "@/app/components/input/input";

interface PriceProps {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    isLoading: boolean;
}

const Price: React.FC<PriceProps> = ({
    register,
    errors,
    isLoading
}) => {
  return (
    <div className="flex flex-col gap-8">
        <Heading
            title="How, set your price"
            subtitle="How much do you want to rent per night?"
        />
        <Input 
            id="price"
            label="Price"
            formatPrice
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
    </div>
  )
}

export default Price