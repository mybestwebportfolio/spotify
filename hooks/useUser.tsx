import { createContext, useContext } from "react"

import { User } from "@supabase/auth-helpers-nextjs"
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react"

type UserContextType = {
    accessToken: string | null;
    user: User | null;
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export interface Props {
    [propName: string]: any
}

export const MyUserContextProvider = (props: Props) => {
    const { session } = useSessionContext()
    const user = useSupaUser()
    const accessToken = session?.access_token ?? null

    const value = {
        accessToken,
        user
    }

    return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
    const context = useContext(UserContext)
    if(context === undefined){
        throw new Error("useUser must be used within a MyUserContextProvider")
    }
    return context
}