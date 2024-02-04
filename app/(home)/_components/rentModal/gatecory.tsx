import React from 'react'
import Heading from '../heading'
import CategoryInput from '@/app/components/category-input'
import { categories } from '../navbar/categories'

interface GategoryProps {
  setCustomValue: (id: string, value: string) => void;
  category: string; 
}
export const Gatecory: React.FC<GategoryProps> = ({
  setCustomValue,
  category
}) => {
  return (
    <div className="flex flex-col gap-8">
    <Heading
      title="Which of these best describes your place?"
      subtitle="Pick a category"
    />
    <div 
      className="
        grid 
        grid-cols-1 
        md:grid-cols-2 
        gap-3
        max-h-[50vh]
        overflow-y-auto
      "
    >
      {categories.map((item) => (
        <div key={item.label} className="col-span-1">
          <CategoryInput
            onClick={(category) => 
              setCustomValue('category', category)}
            selected={category === item.label}
            label={item.label}
            Icon={item.icon}
          />
        </div>
      ))}
    </div>
  </div>
  )
}
