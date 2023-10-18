import { twMerge } from "tailwind-merge"

interface BoxProps {
    children: React.ReactNode
    className?: string
}

const Box = ({children, className}: BoxProps) => {
    return (
        <div className={twMerge(`w-full h-fit bg-neutral-900 rounded-lg px-6 py-5`, className)}>
            {children}
        </div>
    )
}

export default Box