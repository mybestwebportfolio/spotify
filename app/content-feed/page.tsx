import Link from "next/link"

const Page = () => {
    return (
        <div className="mt-5">
            <div className="flex flex-col gap-y-1">
                <h1 className="text-white text-4xl font-bold">{`What's New`}</h1>
                <p className="text-xs text-neutral-400 font-semibold">The latest releases from artist, podcast, and shows you follow</p>
                <div className="flex items-center gap-x-2 mt-4">
                    <Link href="/search" className="bg-neutral-700/40 text-white text-base py-1 px-4 w-fi  font-semibold  cursor-pointer rounded-full disabled:cursor-not-allowed disabled:opacity-50">
                        Music
                    </Link>
                </div>
            </div>
            <div className="flex justify-center items-center py-36">
                <div className="flex flex-col gap-y-5 text-center">
                    <h1 className="text-white text-4xl font-bold">{`We don't have any updates for you yet`}</h1>
                    <p className="text-base font-semibold text-white">{`When there's news, we'll post it here. Follow your favorite artist and podcasts to stay updated on them to.`}</p>
                </div>
            </div>
        </div>
    )
}

export default Page