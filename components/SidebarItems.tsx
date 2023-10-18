import Link from "next/link"

import { twMerge } from "tailwind-merge"
import { IconType } from "react-icons"

interface SidebarItemsProps {
    icon: IconType,
    label: string,
    route: string,
    active: boolean
}

const SidebarItems = ({icon: Icon, label, route, active}: SidebarItemsProps) => {
  return (
    <Link href={route} className={twMerge(`flex gap-x-5 items-center text-neutral-400 hover:text-white`, active && "text-white")}>
        <Icon size={28}/>
        <p className="text-base font-semibold">{label}</p>
    </Link>
  )
}

export default SidebarItems