"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import { toast } from "react-hot-toast"
import uniqid from "uniqid"

import useUploadModal from "@/hooks/useUploadModal"
import { useUser } from "@/hooks/useUser"

import Modal from "./Modal"
import Input from "./Input"
import Button from "./Button"

import { useSupabaseClient } from "@supabase/auth-helpers-react"

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const uploadModal = useUploadModal()
    const supabaseClient = useSupabaseClient()
    const { user } = useUser()

    const onChange = (open: boolean) => {
        if(!open){
            uploadModal.onClose()
        }
    }

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            title: "",
            artist: "",
            song: null,
            image: null
        }
    })

    const onSubmit:SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true)

            const songFile = values.song?.[0]
            const imageFile = values.image?.[0]

            if(!songFile || !imageFile){
                toast.error("Missing fields!")
            }

            const uniqueID = uniqid()

            // Upload song to bucket
            const {data: songData, error: songError} = await supabaseClient.storage.from("songs").upload(`song-${values.title}-${uniqueID}`, songFile, {
                cacheControl: "3600",
                upsert: false
            })
            
            if(songError){
                setIsLoading(false)
                return toast.error("Failed to upload song")
            }

            // Upload image to bucket
            const {data: imageData, error: imageError} = await supabaseClient.storage.from("images").upload(`image-${values.title}-${uniqueID}`, imageFile, {
                cacheControl: "3600",
                upsert: false
            })

            if(imageError){
                setIsLoading(false)
                return toast.error("Failed to upload image")
            }

            const {error: supabaseError} = await supabaseClient.from("songs").insert({
                user_id: user?.id,
                title: values.title,
                artist: values.artist,
                song_path: songData.path,
                image_path: imageData.path
            })

            if(supabaseError){
                setIsLoading(false)
                return toast.error(supabaseError.message)
            }

            router.refresh()
            setIsLoading(false)
            toast.success("Upload song successfully")
            reset()
            uploadModal.onClose()
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal isOpen={uploadModal.isOpen} onChange={onChange} title={`Let's upload your favorite song`} description="Enjoy & Listen your favorite music for free">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <Input id="title" type="text" {...register("title", {required: true})} placeholder="Song title..." className="text-white"/>
                <Input id="artist" type="text" {...register("artist", {required: true})} placeholder="Song creator..." className="text-white"/>
                <div>
                    <div className="pb-1 text-neutral-400">
                        Select a song file
                    </div>
                    <Input id="song" type="file" accept=".mp3" {...register("song", {required: true})} className="text-white file:text-white"/>
                </div>
                <div>
                    <div className="pb-1 text-neutral-400">
                        Select an image
                    </div>
                    <Input id="image" type="file" accept="image/*" {...register("image", {required: true})} className="text-white file:text-white"/>
                </div>
                <Button type="submit" disabled={isLoading} className={`w-full rounded-md text-white bg-green-600`}>
                    Upload
                </Button>
            </form>
        </Modal>
    )
}

export default UploadModal