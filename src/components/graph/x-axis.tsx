import { XAxis } from "recharts"
import { useTheme } from "../../modules/contexts/theme-context"

export const GraphXAxis = ({dataKeyName}:{dataKeyName:string}) => {
    const {theme} = useTheme()
    return(
        <XAxis dataKey={dataKeyName} tickLine={false} tick={{ fontSize: 12, fill: theme === 'dark' ? '#FFFFFF66' : '#1C1C1C66', dy: 8, fontWeight: 400 }} />
    )
}