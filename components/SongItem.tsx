"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { Song } from "@/types"

import useLoadImage from "@/hooks/useLoadImage"
import useAuthModal from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"

import PlayButton from "./PlayButton"
import PlayButtonSongItem from "./PlayButtonSongItem"

interface SongItemProps {
    data: Song
}

const SongItem = ({data}: SongItemProps) => {
    const authModal = useAuthModal()
    const { user } = useUser()
    const router = useRouter()
    const imagePath = useLoadImage(data)
    const handleClick = () => {
        if(!user){
            return authModal.onOpen()
        }
        router.push(`song/${data.id}`)
    }
    return (
        <div className="group flex flex-col gap-y-4 p-3 pb-7 bg-neutral-800/30 rounded-md hover:bg-neutral-600/40 relative overflow-hidden" onClick={handleClick}>
            <div className="relative aspect-square w-full h-full">
                <Image 
                    src={imagePath || ""}
                    alt={data.title}
                    fill
                    className="object-cover rounded-md"
                />
            </div>
            <div className="flex flex-col gap-y-2">
                <h1 className="font-bold text-white text-base">{data.title}</h1>
                <p className="text-sm font-semibold text-neutral-400">{data.artist}</p>
            </div>
            <div className="absolute bottom-28 right-5">
                <PlayButtonSongItem />
            </div>
        </div>
    )
}

export default SongItem