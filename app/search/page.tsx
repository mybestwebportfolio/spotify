import { Song } from "@/types"

import getSongByTitle from "@/actions/getSongByTitle"
import SearchInput from "@/components/SearchInput"
import PlayCard from "@/components/PlayCard"
import PageContent from "@/components/PageContent"
import SearchInputArtist from "@/components/SearchInputArtist"
import getArtist from "@/actions/getArtist"
import CardArtist from "@/components/CardArtist"

interface SearchProps {
  searchParams: {
    title: string
    artist: string
  }
}

const Page = async ({searchParams}: SearchProps) => {
  const songs = await getSongByTitle(searchParams.title)
  const artist = await getArtist(searchParams.artist)
  return (
    <div className="flex flex-col gap-y-8 mt-5">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-white text-2xl font-bold">Search your favorite artist</h1>
          <SearchInputArtist />
          {artist.length > 0 ? (
            <CardArtist song={artist[0]} songs={artist}/>
          ): (
            <h1 className="text-lg text-neutral-400">Type your favorite artist...</h1>
          )}
        </div>

        <div className="flex flex-col gap-y-4">
          <h1 className="text-white text-2xl font-bold">Browse song</h1>
          <SearchInput />
          <div className="flex flex-col gap-y-2">
            {songs.map((song: Song, index: number) => (
              <PlayCard key={song.id} song={song} num={index + 1} imgCover={true} songs={songs}/>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Page