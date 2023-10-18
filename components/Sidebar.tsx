"use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { Song } from "@/types"

import { AiFillHome, AiOutlineSearch } from "react-icons/ai"
import { SlSocialSpotify } from "react-icons/sl"

import Box from "./Box"
import SidebarItems from "./SidebarItems"
import Library from "./Library"
import Header from "./Header"
import Footer from "./Footer"

interface SidebarProps {
    children: React.ReactNode
    songs: Song[]
}

const Sidebar = ({children, songs}: SidebarProps) => {
    const pathname = usePathname()
    const sidebarLinks = useMemo(() => [
        {
            icon: AiFillHome,
            label: 'Home',
            route: '/',
            active: pathname !== "/search"
        },
        {
            icon: AiOutlineSearch,
            label: 'Search',
            route: '/search',
            active: pathname === "/search"
        }
    ], [pathname])
    return (
        <div className="w-full h-full flex gap-x-2 md:p-2">
            <nav className="w-[300px] hidden md:flex flex-col gap-y-2">
                <Box className="flex flex-col gap-y-6">
                    <Link href="/" className="flex items-center gap-x-2">
                        <SlSocialSpotify size={28} className="text-white"/>
                        <p className="font-bold text-white text-base">Spotify</p>
                    </Link>
                    <div className="flex flex-col gap-y-4">
                        {sidebarLinks.map((link) => (
                            <SidebarItems key={link.route} {...link}/>
                        ))}
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full px-3">
                    <Library songs={songs}/>
                </Box>
            </nav>
            <main className="flex-1 w-full h-full bg-neutral-900 rounded-lg overflow-y-auto flex flex-col relative">
                <Header />
                
                <div className="px-6 h-fit">
                    {children}
                </div>
                
                <Footer />
            </main>
        </div>
    )
}

export default Sidebar