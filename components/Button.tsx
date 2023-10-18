import { twMerge } from "tailwind-merge"

interface ButtonProps {
    children: React.ReactNode
    type?: 'button' | 'submit',
    onClick?: () => void,
    className?: string,
    disabled?: boolean
}

const Button = ({ children, type = 'button', onClick, className, disabled }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={twMerge(`w-fit px-5 py-2 bg-white text-black font-semibold text-sm cursor-pointer rounded-full disabled:cursor-not-allowed disabled:opacity-50`, className)} disabled={disabled}>
        {children}
    </button>
  )
}

export default Button