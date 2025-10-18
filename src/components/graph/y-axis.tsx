import { YAxis } from "recharts"
import { useTheme } from "../../modules/contexts/theme-context"

export const GraphYAxis = () => {
    const {theme} = useTheme()
    return(
        <YAxis
            tickFormatter={(value) => `${value===0 ? '0' : value / 1000000 + 'M'}`}
            ticks={[0, 10000000, 20000000, 30000000]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: theme === 'dark' ? '#FFFFFF66' : '#1C1C1C66', dy: -4, dx: -8, fontWeight: 400 }}
        />
    )
}