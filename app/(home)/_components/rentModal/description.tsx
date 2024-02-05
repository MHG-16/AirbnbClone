import React, { useTransition} from 'react'
import Heading from '../heading'
import Input from '@/app/components/input/input';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface DescriptionProps {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    isLoading: boolean;
}

const Description: React.FC<DescriptionProps> = ({
    register,
    errors,
    isLoading
}) => {
  return (
    <div className="flex flex-col gap-8">
        <Heading 
            title="How would you like to describe your place?"
            subtitle="Short and sweet way to describe your place work best!"
        />
        <Input 
            id="title"
            label="Title"
            register={register}
            errors={errors}
            required
            disabled={isLoading}
        />
        <hr/>
        <Input 
            id="description"
            label="Description"
            register={register}
            errors={errors}
            required
            disabled={isLoading}
        />
    </div>
  )
}

export default Description