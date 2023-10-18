"use client"

import qs from "query-string"

import {useState, useEffect} from "react"
import { useRouter } from "next/navigation"

import { AiOutlineSearch } from "react-icons/ai"
import useDebounce from "@/hooks/useDebounce"

const SearchInputArtist = () => {
    const [value, setValue] = useState("")
    const router = useRouter()
    const debouncedValue = useDebounce(value, 500)

    useEffect(() => {
        const query = {
            artist: debouncedValue
        }
        const url = qs.stringifyUrl({
            url: "/search",
            query: query
        }, {skipEmptyString: true, skipNull: true})
        router.push(url)
    }, [debouncedValue, router])
    return (
        <div className="flex items-center relative">
            <AiOutlineSearch className="text-white absolute left-5" size={24}/>
            <input 
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="block bg-neutral-800/90 w-full rounded-full py-3 placeholder:text-xs placeholder:text-neutral-400 px-14 text-neutral-400 focus:outline-none"
                placeholder="Search your favorite artist?"
            />
        </div>
    )
}

export default SearchInputArtist