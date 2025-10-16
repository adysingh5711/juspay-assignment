export const Main = ({children}:{children: React.ReactNode}) => {
    return(
        <div className="flex flex-col gap-7">
            {children}
        </div>
    )
}