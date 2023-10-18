"use client"

import { useState, useEffect } from "react"

import useAuthModal from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"

import { useSessionContext } from "@supabase/auth-helpers-react"

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

interface LikeButtonProps {
    size?: number
    songId: string
}

const LikeButton = ({size, songId}: LikeButtonProps) => {
    const [isLiked, setIsLiked] = useState(false)
    const router = useRouter()

    const {supabaseClient} = useSessionContext()
    const { user } = useUser()
    const authModal = useAuthModal()

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabaseClient.from("liked_song").select("*").eq("user_id", user?.id).eq("song_id", songId).single()

            if(data && !error){
                setIsLiked(true)
            }
        }
        fetchData()
    }, [supabaseClient, songId, user?.id])

    const handleLikeButton = async () => {
        if(!user){
            return authModal.onOpen()
        }

        if(isLiked){
            const { error } = await supabaseClient.from("liked_song").delete().eq("user_id", user.id).eq("song_id", songId).single()

            if(error){
                return toast.error(error.message)
            }else{
                setIsLiked(false)
            }
        }else{
            const { error } = await supabaseClient.from("liked_song").insert({
                user_id: user.id,
                song_id: songId
            })

            if(error){
                return toast.error(error.message)
            }else{
                setIsLiked(true)
            }
        }

        router.refresh()
    }
    const Icon = isLiked ? AiFillHeart : AiOutlineHeart
    return (
        <button onClick={handleLikeButton}>
            <Icon color={isLiked ? "#22c55e" : "rgb(163, 163, 163)"} size={size}/>
        </button>
    )
}

export default LikeButton