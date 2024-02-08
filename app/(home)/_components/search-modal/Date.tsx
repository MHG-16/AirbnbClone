
import { Range } from 'react-date-range';

import Heading from '../heading'
import Calendar from '@/app/components/input/Calendar';

interface DateProps {
    dateRange: Range;
    setDateRange: (value: Range) => void;
}
const DateRange: React.FC<DateProps> = ({
    dateRange,
    setDateRange
}) => {
  return (
    <div className='flex flex-col gap-8'>
        <Heading title="When do you plan to go?" subtitle="Make sure everyone is free!" />
        <Calendar 
            value={dateRange}
            onChange={(value) => setDateRange(value.selection)}
        />
    </div>
  )
}

export default DateRange