import { YAxis } from "recharts"
import { useTheme } from "../../modules/contexts/theme-context"

/**
 * GraphYAxis Component
 * 
 * A reusable Y-axis component for all charts in the application. This component
 * provides consistent formatting and styling for monetary values displayed on
 * the vertical axis.
 * 
 * Key design decisions:
 * - Custom tick formatter for million-dollar notation (e.g., "10M" instead of "10000000")
 * - Fixed tick values for consistent scale across all charts
 * - No axis or tick lines for minimal, clean appearance
 * - Theme-aware tick colors for proper visibility
 * - Negative offset positioning for better label placement
 * 
 * Formatter logic:
 * - Special case for 0 to avoid "0M" notation
 * - Divides values by 1,000,000 and appends "M"
 * - Creates more readable labels for large financial values
 * 
 * Fixed ticks:
 * - [0, 10M, 20M, 30M] provides consistent scale
 * - Ensures all graphs have comparable y-axis ranges
 * - Makes cross-chart comparisons easier for users
 * 
 * Positioning:
 * - dy: -4 moves labels up slightly for better alignment
 * - dx: -8 moves labels left to prevent overlap with chart area
 */
export const GraphYAxis = () => {
    const { theme } = useTheme()
    return (
        <YAxis
            tickFormatter={(value) => `${value === 0 ? '0' : value / 1000000 + 'M'}`}
            ticks={[0, 10000000, 20000000, 30000000]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: theme === 'dark' ? '#FFFFFF66' : '#1C1C1C66', dy: -4, dx: -8, fontWeight: 400 }}
        />
    )
}