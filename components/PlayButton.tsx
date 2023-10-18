import { twMerge } from "tailwind-merge"

import { FaPlay } from "react-icons/fa"
import { Song } from "@/types"

interface PlayButtonProps {
  className?: string
  size?: number
}

const PlayButton = ({className, size}: PlayButtonProps) => {
  return (
    <button className={twMerge(`bg-green-600 rounded-full flex items-center p-3 opacity-0 group-hover:opacity-100 hover:scale-105 transition`, className)}>
        <FaPlay className="text-black pl-1" size={size}/>
    </button>
  )
}

export default PlayButton