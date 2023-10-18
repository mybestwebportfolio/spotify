import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import getSongs from './getSongs'

const getSongByTitle = async (title: string) => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  })

  if (!title) {
    const songs = await getSongs()
    return songs
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`)

  if (error) {
    console.log(error.message)
  }

  return (data as any) || []
}

export default getSongByTitle
