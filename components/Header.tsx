"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { IoIosArrowBack, IoIosArrowForward, IoMdNotificationsOutline } from "react-icons/io"
import { AiFillHome, AiOutlineSearch, AiOutlinePlus } from "react-icons/ai"
import { BsArrowDownShort } from "react-icons/bs"
import { GoPerson } from "react-icons/go"
import { AiOutlineExport } from "react-icons/ai"
import { toast } from "react-hot-toast"

import Button from "./Button"

import useAuthModal from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"

import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useSessionContext } from "@supabase/auth-helpers-react"

const Header = () => {
    const [dropDown, setDropDown] = useState(false)
    const authModal = useAuthModal()
    const { user } = useUser()
    const router = useRouter()

    const supabaseClient = useSupabaseClient()
    const { session } = useSessionContext()

    useEffect(() => {
        if(session){
            setDropDown(false)
        }
    }, [session])

    const handleSignOut = async () => {
        const { error } = await supabaseClient.auth.signOut()

        router.refresh()

        if(error){
            return toast.error(error.message)
        }

        toast.success("Logged out!")
    }

    const handleDropDown = () => {
        setDropDown(!dropDown)
    }

    return (
        <header className="w-full h-fit py-4 px-6 bg-neutral-950/20 flex items-center justify-between sticky top-0 z-10">
            <div className="hidden md:flex items-center  gap-x-3">
                <button className="flex items-center justify-center bg-black p-1 rounded-full" onClick={router.back}>
                    <IoIosArrowBack size={26} className="text-neutral-400"/>
                </button>
                <button className="flex items-center justify-center bg-black p-1 rounded-full" onClick={router.forward}>
                    <IoIosArrowForward size={26} className="text-neutral-400"/>
                </button>     
            </div>

            <div className="flex items-center gap-x-3 md:hidden">
                <button className="flex items-center justify-center bg-white p-2 rounded-full hover:transition hover:scale-105">
                    <AiFillHome size={22} className="text-neutral-900"/>
                </button>
                <button className="flex items-center justify-center bg-white p-2 rounded-full hover:transition hover:scale-105">
                    <AiOutlineSearch size={22} className="text-neutral-900"/>
                </button>   
                <button className="flex items-center justify-center bg-white p-2 rounded-full hover:transition hover:scale-105">
                    <AiOutlinePlus size={22} className="text-neutral-900"/>
                </button>   
            </div>

            {user ? (
                <div className="flex items-center gap-x-3">
                    <Button className="max-md:hidden bg-white text-black text-sm font-bold hover:transition hover:scale-105 hover:text-black px-4">
                        Explore Premium
                    </Button>
                    <Button className="max-md:hidden bg-black text-white text-sm font-bold hover:transition hover:scale-105 flex items-center gap-x-2 px-4">
                        <div className="border rounded-full">
                            <BsArrowDownShort size={18}/>
                        </div>
                        <p>Install App</p>
                    </Button>
                    <Button className="p-2 bg-black text-neutral-400 hover:transition hover:scale-105" onClick={() => router.push("/content-feed")}>
                        <IoMdNotificationsOutline size={22}/>
                    </Button>
                    <Button className="p-2 bg-black text-white font-bold hover:transition hover:scale-105" onClick={handleDropDown}>
                        <GoPerson size={22}/>
                    </Button>

                    {dropDown && (
                        <div className="w-[225px] h-fit bg-[#282828] absolute top-[72px] right-[28px] rounded-md drop-shadow-md">
                            <ul className="flex flex-col gap-y-6 p-4">
                                <li>
                                    <button className="w-full flex items-center justify-between text-white text-sm">
                                        <p>Account</p>
                                        <AiOutlineExport size={20}/>
                                    </button>
                                </li>
                                <li>
                                    <button className="w-full flex items-center justify-between text-white text-sm">
                                        <p>Profile</p>
                                    </button>
                                </li>
                                <li>
                                    <button className="w-full flex items-center justify-between text-white text-sm">
                                        <p>Upgrade to Premium</p>
                                        <AiOutlineExport size={20}/>
                                    </button>
                                </li>
                                <li>
                                    <button className="w-full flex items-center justify-between text-white text-sm">
                                        <p>Settings</p>
                                    </button>
                                </li>
                            </ul>
                            <div className="w-[215px] h-[1px] mx-auto rounded-full bg-neutral-400/20"/>
                            <button className="w-full flex items-center justify-between text-white text-sm p-4" onClick={handleSignOut}>
                                Log out
                            </button>
                        </div>
                    )}
                </div>
            ): (    
                <div className="flex items-center gap-x-3">
                    <Button className="bg-transparent text-neutral-400 text-base hover:transition hover:scale-105 hover:text-white" onClick={authModal.onOpen}>
                        Sign up
                    </Button>
                    <Button className="hover:transition hover:scale-105 py-3 px-10 font-bold" onClick={authModal.onOpen}>
                        Log in
                    </Button>
                </div>
            )}
        </header>
    )
}

export default Header