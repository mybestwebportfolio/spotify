import { Song } from "@/types"
import Image from "next/image"

interface HeaderSongProps {
    firtsColor: string | undefined
    secondColor: string | undefined
    imagePath: string | null
    song: Song
}

const HeaderSong = ({firtsColor, secondColor, imagePath, song}: HeaderSongProps) => {
    const year = new Date(song.created_at).getFullYear()
    return (
        <div className={`w-full h-80 relative`} style={{ backgroundImage: `linear-gradient(to bottom, ${firtsColor}, ${secondColor})` }}>
            <div className="absolute bottom-7 left-7 flex gap-x-5">
                <div className="w-52 max-md:w-36 aspect-square">
                    <Image src={imagePath || ""} alt="song image" fill className="object-cover rounded-md"/>
                </div>
            </div>
            <div className="absolute bottom-7 left-64 max-md:left-48">
                <div className="flex flex-col gap-8 justify-end">
                    <div className="flex flex-col gap-y-3">
                        <h3 className="text-sm text-white font-semibold">Song</h3>
                        <h1 className="text-white text-7xl max-md:text-4xl font-semibold">{song.title}</h1>
                    </div>
                    <div className="flex items-center gap-x-2 max-md:hidden">
                        <h3 className="text-white text-sm font-semibold">{song.artist}</h3>
                        <div className="w-[5px] h-[5px] bg-white font-semibold rounded-full" />
                        <h2 className="text-white text-sm">{song.title}</h2>
                        <div className="w-[5px] h-[5px] bg-white font-semibold rounded-full" />
                        <p className="text-white text-sm">{year}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderSong