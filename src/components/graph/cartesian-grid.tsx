import { CartesianGrid } from "recharts"
import { useTheme } from "../../modules/contexts/theme-context"

export const GraphCartesianGrid = () => {
    const {theme} = useTheme()
    const strokeColor = theme === 'dark' ? "#FFFFFF66" : "#E5E7EB"
    return(
        <CartesianGrid strokeDasharray="3 0" vertical={false} stroke={strokeColor} />
    )
}