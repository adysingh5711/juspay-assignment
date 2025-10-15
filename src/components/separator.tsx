export const Separator = ({direction, color, length}: {direction: "horizontal" | "vertical", color: string, length: string}) => {
    return(
        <div className={`${direction === "horizontal" ? `${length} h-[1px]` : `${length} w-[1px]`} ${color} `} />
    )
}