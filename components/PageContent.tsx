import { Song } from "@/types"
import SongItem from "./SongItem"

interface PageContentProps {
    songs: Song[]
}

const PageContent = ({songs}: PageContentProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-x-4">
        {songs.map((song) => (
            <SongItem key={song.id} data={song}/>
        ))}
    </div>
  )
}

export default PageContent