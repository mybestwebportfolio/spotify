import { Song } from "@/types" 

import getSongByArtist from "@/actions/getSongByArtist"
import getSongById from "@/actions/getSongById"
import getSongByArtistLimit from "@/actions/getSongByArtistLimit"

import PageSong from "@/components/PageSong"

export const revalidate = 0

const Page = async ({params}: {params: {songId: string}}) => {
    const song: Song = await getSongById(params.songId)
    const songByArtist = await getSongByArtist(song.artist)
    const songByArtistLimit = await getSongByArtistLimit(song.artist)
    return (
        <PageSong song={song} songByArtist={songByArtist} songByArtistLimit={songByArtistLimit} params={params.songId}/>
    )
}

export default Page