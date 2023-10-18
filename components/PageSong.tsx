"use client"

import { useState, useEffect } from "react"

import { Song } from "@/types"

import useLoadImage from "@/hooks/useLoadImage"
import { getColorFromImage } from "@/hooks/getColorFromImage"
import useOnPlay from "@/hooks/useOnPlay"
import useLoadSongUrl from "@/hooks/useLoadSongUrl"

import HeaderSong from "./HeaderSong"
import PlayButton from "./PlayButton"
import LikeButton from "./LikeButton"
import DotOptionButton from "./DotOptionButton"
import SingleCard from "./SingleCard"
import PlayCard from "./PlayCard"
import Button from "./Button"

import { BsPauseFill } from "react-icons/bs"
import useSound from "use-sound"

interface PageSongProps{
    song: Song
    songByArtist: Song[]
    songByArtistLimit: Song[]
    params?: string
}

const PageSong = ({song, songByArtist, songByArtistLimit, params}: PageSongProps) => {
    const [moreSong, setMoreSong] = useState(true)
    const [firtsColor, setfirtsColor] = useState<string | undefined>("")
    const [secondColor, setsecondColor] = useState<string | undefined>("")
    const imagePath = useLoadImage(song)
    const onPlay = useOnPlay(songByArtist)
    useEffect(() => {
        const getColor = async () => {
            const colorPalette = await getColorFromImage(imagePath || "")
            setfirtsColor(colorPalette.LightMuted?.getHex())
            setsecondColor(colorPalette.DarkMuted?.getHex())
        }
        getColor()
    }, [imagePath])

    useEffect(() => {
        setMoreSong(false)
    }, [])

    const handleShowMore = () => {
        setMoreSong(!moreSong)
    }

    return (
        <div className="flex flex-col gap-y-6">
            <HeaderSong firtsColor={firtsColor?.replace(/["']/g, '')} secondColor={secondColor} imagePath={imagePath} song={song}/>

            <div className="flex items-center gap-x-6">
                <PlayButton className="opacity-100 p-5" size={20} onClick={(id: string) => onPlay(id)} data={song}/>
                <LikeButton songId={song.id} size={38}/>
                <DotOptionButton size={28}/>
            </div>

            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-1">
                    <h2 className="text-sm text-neutral-400">Popular Tracks by</h2>
                    <h1 className="text-2xl text-white font-semibold">{song.artist}</h1>
                </div>
                {moreSong ? (
                    <div>
                        {songByArtist.map((item, index) => (
                            <PlayCard key={item.id} song={item} songs={songByArtist} num={index + 1} className={`${song.id === item.id && "text-green-600"}`} popularTrack={true} imgCover={true} params={params}/>
                        ))}
                    </div>
                ): (
                    <div>
                        {songByArtistLimit.map((item, index) => (
                            <PlayCard key={item.id} song={item} songs={songByArtistLimit} num={index + 1} className={`${song.id === item.id && "text-green-600"}`} popularTrack={true} imgCover={true} params={params}/>
                        ))}
                    </div>
                )}
                {songByArtistLimit.length >= 5 && (
                    <Button className="text-neutral-400 font-semibold text-sm bg-transparent" onClick={handleShowMore}>
                        {moreSong ? "Show less" : "See more"}
                    </Button>
                )}
            </div>

            <div className="flex flex-col gap-y-1">
                <SingleCard song={song} title={song.title}/>
                <PlayCard song={song} songs={songByArtist} popularTrack={false} params={params}/>
            </div>
        </div>
    )
}

export default PageSong