import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface CategoryInputProps {
    onClick: (value: string) => void;
    selected: boolean;
    label: string;
    Icon: IconType;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    onClick,
    selected,
    label,
    Icon
}) => {
  return (
    <div
        onClick={() => onClick(label)}
        className={cn(
            "rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer",
            selected ? "border-black" : "border-neutral-200"
        )}
    >
        <Icon size={30} />
        <div className="font-semibold ">
            {label}
        </div>
    </div>
  )
}

export default CategoryInput