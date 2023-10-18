import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getSongByUserId = async () => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  })

  const { data: sessionData } = await supabase.auth.getSession()

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', sessionData.session?.user.id)

  if (error) {
    console.log(error.message)
  }

  return (data as any) || []
}

export default getSongByUserId
