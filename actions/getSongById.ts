import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getSongByPath = async (songId: string) => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  })

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('id', songId)
    .single()

  if (error) {
    console.log(error.message)
  }

  return (data as any) || []
}

export default getSongByPath
