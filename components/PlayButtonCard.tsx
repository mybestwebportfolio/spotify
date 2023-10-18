"use client"

import { Song } from "@/types"
import { FaPlay } from "react-icons/fa"

interface PlayButtonCardProps {
    onClick: (id: string) => void
    data: Song
}

const PlayButtonCard = ({onClick, data}: PlayButtonCardProps) => {
  return (
    <FaPlay onClick={() => onClick(data.id)} className="text-neutral-400 hidden group-hover:flex" size={14}/>
  )
}

export default PlayButtonCard