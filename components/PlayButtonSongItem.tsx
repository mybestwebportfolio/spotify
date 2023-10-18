import { twMerge } from "tailwind-merge"

import { FaPlay } from "react-icons/fa"
import { Song } from "@/types"


const PlayButtonSongItem = () => {
  return (
    <button className={twMerge(`bg-green-600 rounded-full flex items-center p-3 opacity-0 group-hover:opacity-100 hover:scale-105 transition`)}>
        <FaPlay className="text-black pl-1" size={20}/>
    </button>
  )
}

export default PlayButtonSongItem