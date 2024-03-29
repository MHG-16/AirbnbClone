import { Hint } from "@/components/hint";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
    label: string;
    icon: IconType,
    description: string;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    label,
    icon:Icon,
    description,
    selected
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery =  {};

    if (params){
      currentQuery = qs.parse(params.toString());
    }

    const updateQuery: any = {
      ...currentQuery,
      category: label
    }

    if(params?.get("category") === label ) {
      delete updateQuery.category;
    }

    const url =qs.stringifyUrl({
      url: "/",
      query: updateQuery
    }, { skipNull: true});

    router.push(url);
  }, [label, params, router])

  return (
    <Hint label={description} align="center" side="bottom" asChild>
        <div 
        onClick={handleClick}
        className={cn(
        "flex flex-col items-center justify-center gap-2 p-3 hover:text-neutral-800 transition cursor-pointer",
        selected ? "border-b-neutral-800 text-neutral-800" : "bg-transparent text-neutral-500",
      )}>
          <Icon size={26}  />
          <div className="font-medium text-sm">
            {label}
          </div>
        </div>
    </Hint>
  )
}

export default CategoryBox