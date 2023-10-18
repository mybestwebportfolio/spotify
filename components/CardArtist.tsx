"use client"

import { Song } from "@/types"

import Image from "next/image"

import useLoadImage from "@/hooks/useLoadImage"
import PlayCard from "./PlayCard"

interface CardArtistProps {
    song: Song
    songs: Song[]
}

const CardArtist = ({song, songs}: CardArtistProps) => {
    const imagePath = useLoadImage(song)
    return (
        <div className="flex max-lg:flex-col gap-y-4 gap-x-4 w-full h-56 max-lg:h-fit">
            <div className="flex flex-col gap-y-3">
                <h1 className="text-white text-xl font-bold">Top result</h1>

                <div className="w-80 max-lg:w-full h-full bg-neutral-800/30 rounded-md flex flex-col gap-y-3 justify-center pl-4 max-lg:py-4">
                    <div className="relative aspect-square w-20">
                        <Image 
                            src={imagePath || ""}
                            alt={song.title}
                            fill
                            className="object-cover rounded-full"
                        />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <h1 className="text-2xl text-white font-bold">{song.artist}</h1>
                        <p className="text-sm text-white font-semibold bg-black/25 rounded-full py-1 px-3 w-fit">Artist</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full h-full flex flex-col gap-y-3 overflow-y-auto">
                <h1 className="text-white text-xl font-bold">Songs</h1>

                <div className="w-full">
                    {songs.map((song) => (
                        <PlayCard key={song.id} song={song} songs={songs} imgCover={true} needNum={false}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CardArtist