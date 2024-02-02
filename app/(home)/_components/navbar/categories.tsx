"use client";

import { Container } from '@/app/(home)/_components/container'
import { GiBarn, GiBoatFishing, GiCastle, GiCaveEntrance, GiDesert, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi'
import { MdDownhillSkiing, MdOutlineVilla } from 'react-icons/md'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import CategoryBox from './categoryBox'
import { usePathname, useSearchParams } from 'next/navigation';
import { IoIosSnow } from 'react-icons/io';
import { BiDiamond } from 'react-icons/bi';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export const categories = [
    {
        label: "Beach",
        icon: TbBeach,
        description: "This property is close to the beach!"
    },
    {
        label: "Widmills",
        icon: GiWindmill,
        description: "The windmill is just a short walk away."
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "A modern villa with all the amenities you need for your holiday home."
    },
    {
        label: "Countryside",
        icon: TbMountain,
        description: "The countryside is just a drive away. Perfect for those who love nature and want some peace and quiet.",
    },
    {
        label: "Pools",
        icon: TbPool,
        description: "Houses with a pool"
    },
    {
        label: "Islands",
        icon: GiIsland,
        description: "Islands are great if you want to be far away from it all.",
    },
    {
        label: "Lake",
        icon: GiBoatFishing,
        description: "lake is great for people who want to be"
    },
    {
        label: "Skiing",
        icon: MdDownhillSkiing,
        description: "Perfect for skiers and snowboarders"
    },
    {
        label: "Castles",
        icon: GiCastle,
        description: "Castles are great for people who want to"
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: "Camping is great for people who want"
    },
    {
        label: "Arctic",
        icon: IoIosSnow,
        description: "Arctic is great for people who want iced places"
    },
    {
        label: "Cave",
        icon: GiCaveEntrance,
        description: "Cave is great for people who want"
    },
    {
        label: "Desert",
        icon: GiDesert,
        description: "Desert"
    },
    {
        label: "Barns",
        icon: GiBarn,
        description: "barns is perfect for people who want"
    },
    {
        label: "Lux",
        icon: BiDiamond,
        description: "Luxury tours. High class service."
    }
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if(!isMainPage) {
    return null;
  }
  return (
    <Container>
        <ScrollArea className="w-full whitespace-nowrap">
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        description={item.description}
                        icon={item.icon}
                        selected={category === item.label}
                    />
                ))}
            </div>
            <ScrollBar orientation="horizontal" className='text-black'/>
        </ScrollArea>
    </Container>
  )
}

export default Categories