import Link from "next/link"

import { footerLinks } from "@/constant"

import { AiOutlineInstagram, AiOutlineTwitter, AiFillFacebook } from "react-icons/ai"

const Footer = () => {
    return (
        <footer className="w-full h-full flex flex-col gap-y-6 px-6 py-10">
            <div className="flex flex-row flex-wrap gap-y-5 justify-between">
                <div className="flex flex-wrap gap-x-20 lg:gap-x-36 gap-y-4">
                    <div className="flex flex-col gap-y-4">
                        {footerLinks[0].map((link, index) => (
                            <Link key={index} href="/" className={`text-base text-neutral-400 ${index === 0 && "text-white font-bold"}`}>
                                {link}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col gap-y-4">
                        {footerLinks[1].map((link, index) => (
                            <Link key={index} href="/" className={`text-base text-neutral-400 ${index === 0 && "text-white font-bold"}`}>
                                {link}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col gap-y-4">
                        {footerLinks[2].map((link, index) => (
                            <Link key={index} href="/" className={`text-base text-neutral-400 ${index === 0 && "text-white font-bold"}`}>
                                {link}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-start gap-x-6">
                    <button className="p-2 bg-neutral-800 hover:bg-neutral-600 rounded-full">
                        <AiOutlineInstagram size={26} className="text-white"/>
                    </button>
                    <button className="p-2 bg-neutral-800 hover:bg-neutral-600 rounded-full">
                        <AiOutlineTwitter size={26} className="text-white"/>
                    </button>
                    <button className="p-2 bg-neutral-800 hover:bg-neutral-600 rounded-full">
                        <AiFillFacebook size={26} className="text-white"/>
                    </button>
                </div>
            </div>

            <div className="w-full h-[.5px] rounded-full bg-neutral-400"/>

            <p className="text-sm text-neutral-400">© 2023 Spotify AB</p>
        </footer>
    )
}

export default Footer