"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"

import useLoadImage from "@/hooks/useLoadImage"

import { twMerge } from "tailwind-merge"
import { Song } from "@/types"

import { FaPlay } from "react-icons/fa"
import { MdDelete } from "react-icons/md"


import DotOptionButton from "./DotOptionButton"
import LikeButton from "./LikeButton"

import { useSessionContext } from "@supabase/auth-helpers-react"
import { useUser } from "@/hooks/useUser"
import { toast } from "react-hot-toast"
import useOnPlay from "@/hooks/useOnPlay"
import PlayButtonCard from "./PlayButtonCard"

interface PlayCardProps {
    song: Song
    songs: Song[]
    num?: number
    className?: string
    popularTrack?: boolean
    imgCover?: boolean
    needNum?: boolean
    params?: string
}

const PlayCard = ({song, songs, num = 1, className, popularTrack, imgCover, needNum = true, params}: PlayCardProps) => {
    const [optionBox, setOptionBox] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const imagePath = useLoadImage(song)
    const {supabaseClient} = useSessionContext()
    const { user } = useUser()
    const onPlay = useOnPlay(songs)

    useEffect(() => {
        setOptionBox(false)
    }, [])

    const handleClick = () => {
        if(pathname === "/song"){
            router.push(`/${song.id}`)
        }else{
            router.push(`/song/${song.id}`)
        }
    }

    const handleOptionBoxClick = () => {
        setOptionBox(!optionBox)
    }

    const handleDelete = async () => {
        const {error} = await supabaseClient.from("songs").delete().eq("user_id", user?.id).eq("id", song.id).single()

        if(error){
            console.log(error.message)
            return toast.error("Failed to delete song!")
        }

        if(params === song.id.toString()){
            router.push("/")
            router.refresh()
        }

        router.refresh()
        toast.success("Delete song successfully!")

    }
    return (
        <div className="group w-full flex justify-between items-center bg-transparent hover:bg-neutral-600/40 px-3 py-2 rounded-md relative">
            <div className="flex gap-x-8 items-center cursor-pointer">
                {needNum && <p className={twMerge(`text-xl text-neutral-400 font-semibold group-hover:hidden mr-1`, className)}>{num}</p>}
                <PlayButtonCard onClick={(id: string) => onPlay(id)} data={song}/>
                {imgCover && (
                    <div className={twMerge(`relative w-10 aspect-square`)}>
                        <Image src={imagePath || ""} alt={song.title} fill className="object-cover"/>
                    </div>
                )}
                <div onClick={handleClick} className="flex flex-col items-start">
                    <h1 className={twMerge(`text-base text-white font-semibold`, className)}>{song.title}</h1>
                    <h2 className={twMerge(`text-sm text-neutral-400`, popularTrack ? "hidden" : "block")}>{song.artist}</h2>
                </div>
            </div>
            <div className="flex gap-x-6 items-center">
                <LikeButton songId={song.id} size={24}/>
                <DotOptionButton size={20} className="text-white" onClick={handleOptionBoxClick}/>
                {optionBox && (
                    <div className="h-fit w-48 bg-neutral-800 drop-shadow-md rounded-md absolute bottom-11 right-3">
                        <ul className="flex flex-col gap-y-3">
                            <li className="flex justify-between items-center py-3 px-4 rounded-md hover:bg-neutral-700/70">
                                <button className="text-sm text-white">
                                    Add to playlist
                                </button>
                                <button>
                                    <FaPlay size={14} className="text-white"/>
                                </button>
                            </li>
                            <li className="flex justify-between items-center py-3 px-4 rounded-md hover:bg-neutral-700/70">
                                <button className="text-sm text-white">
                                    Save to your Liked Songs
                                </button>
                            </li>
                            <li className="flex justify-between items-center py-3 px-4 rounded-md hover:bg-neutral-700/70">
                                <button className="text-sm text-white">
                                    Go to artist
                                </button>
                                <button>
                                    <FaPlay size={14} className="text-white"/>
                                </button>
                            </li>
                            <li className="w-full px-2">
                                <div className="w-full h-[2px] bg-neutral-400 rounded-full"/>
                            </li>
                            <li className="flex justify-between items-center py-3 px-4 rounded-md hover:bg-neutral-700/70" onClick={handleDelete}>
                                <button className="text-sm text-white">
                                    Delete Song
                                </button>
                                <button>
                                    <MdDelete size={18} className="text-white"/>
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PlayCard