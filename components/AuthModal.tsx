import { useEffect } from "react"
import { useRouter } from "next/navigation"

import useAuthModal from "@/hooks/useAuthModal"

import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"
import { toast } from "react-hot-toast"

import Modal from "./Modal"

const AuthModal = () => {
    const supabaseClient = useSupabaseClient()
    const authModal = useAuthModal()
    const { session } = useSessionContext()
    const router = useRouter()

    useEffect(() => {
        if(session){
            router.refresh()
            authModal.onClose()   
            // toast.success("Login successfully!")         
        }
    }, [session])

    const onChange = (open: boolean) => {
        if(!open){
            authModal.onClose()
        }
    }
    return (
        <Modal isOpen={authModal.isOpen} title={`Let's listen your favorite music`} onChange={onChange}>
            <Auth 
                theme="dark"
                providers={['google']}
                supabaseClient={supabaseClient}
                appearance={{ 
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: "#404040",
                                brandAccent: "#22c55e"
                            }
                        }
                    }
                 }}
            />
        </Modal>
    )
}

export default AuthModal