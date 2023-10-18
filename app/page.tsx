import getSongs from "@/actions/getSongs";

import Button from "@/components/Button";
import PageContent from "@/components/PageContent";

export const revalidate = 0

export default async function Home() {
  const songs = await getSongs()
  return (
      <>
        {songs.length > 0 ? (
          <div className="flex flex-col gap-y-5 mt-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl text-white font-bold hover:underline">Recommended for you</h1>
              <Button className="bg-transparent text-md text-neutral-400 font-semibold hover:underline">
                Show all
              </Button>
            </div>
            <PageContent songs={songs}/>
        </div>
        ): (
          <h1 className="text-2xl text-white font-bold hover:underline mt-4">No song found...</h1>
        )}
      </>
  )
}
