import Link from "next/link"

import { Song } from "@/types"

import { sidebarFooterLinks } from "../constant"

import { LuLibrary } from "react-icons/lu"
import { AiOutlinePlus } from "react-icons/ai"
import { CiGlobe } from "react-icons/ci"

import Button from "./Button"
import SidebarBox from "./SidebarBox"

import useAuthModal from "@/hooks/useAuthModal"
import useUploadModal from "@/hooks/useUploadModal"
import { useUser } from "@/hooks/useUser"
import SingleCard from "./SingleCard"

interface LibraryProps {
  songs: Song[]
}

const Library = ({songs}: LibraryProps) => {
  const { user } = useUser()
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()

  const handleUpload = () => {
    if(!user){
      return authModal.onOpen()
    }
    return uploadModal.onOpen()
  }
  return (
    <div className="w-full h-full flex flex-col gap-y-6 relative">
        <div className="flex items-center justify-between px-3">
            <div className="flex items-center gap-x-2 text-neutral-400 hover:text-white cursor-pointer">
                <LuLibrary size={28}/>
                <p className="font-bold text-base">Your Library</p>
            </div>
            <button className="text-neutral-400 hover:bg-neutral-700/30 p-1 rounded-full hover:text-white" onClick={handleUpload}>
                <AiOutlinePlus size={22}/>
            </button>
        </div>
        <div className="flex flex-col gap-y-3 h-[300px] overflow-y-auto py-2">
            {user && songs.length > 0 ? (
              <div className="flex flex-col gap-y-2">
                <h1 className="text-neutral-400 text-base font-bold ml-2">My Library</h1>
                {songs.map((song) => (
                  <SingleCard song={song} title={song.title} className="w-14"/>
                ))}
              </div>
            ): (
              <>
                <SidebarBox boxTitle="Create your library" description={`It's easy, we'll help you`} btnTitle="Create library" onClick={handleUpload}/>
              </>
            )}
            <SidebarBox boxTitle="Create your first playlist" description={`It's easy, we'll help you`} btnTitle="Create playlist"/>
        </div>
        <div className="h-fit flex flex-wrap gap-x-4 gap-y-4 text-xs text-neutral-400">
          {sidebarFooterLinks.map((link) => (
            <Link key={link} href="/">
              {link}
            </Link>
          ))}
        </div>
        <Button className="flex p-2 gap-x-2 items-center bg-transparent border border-solid border-white mt-10">
            <CiGlobe size={20} className="text-white"/>
            <p className="text-sm text-white">English</p>
        </Button>
    </div>
  )
}

export default Library