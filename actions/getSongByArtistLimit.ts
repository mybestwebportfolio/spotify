import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getSongByArtistLimit = async (artist: string) => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  })

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('artist', artist)
    .limit(5)

  if (error) {
    console.log(error.message)
  }

  return (data as any) || []
}

export default getSongByArtistLimit
