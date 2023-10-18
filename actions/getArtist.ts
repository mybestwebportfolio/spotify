import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import getSongs from './getSongs'

const getArtist = async (artist: string) => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  })

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('artist', `%${artist}%`)

  if (error) {
    console.log(error.message)
  }

  return (data as any) || []
}

export default getArtist
