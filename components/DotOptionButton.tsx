import { twMerge } from "tailwind-merge"

import { BsThreeDots } from "react-icons/bs"

interface DotOptionButtonProps{
  size?: number
  className?: string
  onClick?: () => void
}

const DotOptionButton = ({ size, className, onClick }: DotOptionButtonProps) => {
  return (
    <button onClick={onClick}>
        <BsThreeDots size={size} className={twMerge(`text-neutral-400`, className)}/>
    </button>
  )
}

export default DotOptionButton