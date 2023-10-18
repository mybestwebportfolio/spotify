import Button from "./Button"

interface SidebarBoxProps{
    boxTitle: string
    description: string
    btnTitle: string
    onClick?: () => void
}

const SidebarBox = ({boxTitle, description, btnTitle, onClick}: SidebarBoxProps) => {
  return (
    <div className="w-full h-fit flex flex-col gap-y-4 rounded-lg p-5 bg-neutral-800">
        <h1 className="text-sm text-white font-bold">{boxTitle}</h1>
        <p className="text-xs text-white font-bold">{description}</p>
        <Button className="transition hover:scale-105" onClick={onClick}>
            {btnTitle}
        </Button>
    </div>
  )
}

export default SidebarBox