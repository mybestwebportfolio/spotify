"use client"

import { twMerge } from "tailwind-merge"

import useLoadImage from "@/hooks/useLoadImage"
import { Song } from "@/types"
import Image from "next/image"
import PlayButton from "./PlayButton"

import { FaPlay } from "react-icons/fa"

interface SingleCardProps {
    song: Song
    title: string
    className?: string
    playBtn?: boolean
    transparentBg?: boolean 
}

const SingleCard = ({song, title, className, playBtn, transparentBg}: SingleCardProps) => {
  const imagePath = useLoadImage(song)
  return (
    <div className={twMerge(`flex justify-between items-center w-full bg-neutral-600/40 hover:bg-neutral-400/50 rounded-md`, transparentBg && "bg-transparent")}>
        <div className="flex gap-x-4">
          <div className={twMerge(`relative w-20 aspect-square`, className)}>
            <Image src={imagePath || ""} alt="Song image" fill className="object-cover rounded-md"/>
          </div>
          <div className="flex flex-col justify-center items-start">
              <h2 className="text-xs text-white max-md:truncate">From the single</h2>
              <h1 className="text-base text-white font-semibold max-md:truncate">{title}</h1>
          </div>
        </div>
        {playBtn && (
          <div>
            <FaPlay className="text-neutral-400 mr-4" size={20}/>
          </div>
        )}
    </div>
  )
}

export default SingleCard