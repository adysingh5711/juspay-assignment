import { XAxis } from "recharts"
import { useTheme } from "../../modules/contexts/theme-context"

/**
 * GraphXAxis Component
 * 
 * A reusable X-axis component for all charts in the application. This component
 * provides consistent styling and theme support across all graphs.
 * 
 * Key design decisions:
 * - No tick lines for cleaner appearance (tickLine={false})
 * - Small font size (12px) for space efficiency
 * - Theme-aware tick colors with appropriate opacity
 * - Consistent vertical offset (dy: 8) for proper spacing
 * - Normal font weight for better readability
 * 
 * Styling rationale:
 * - Light mode: Semi-transparent black (#1C1C1C66) for subtle labels
 * - Dark mode: Semi-transparent white (#FFFFFF66) for visibility
 * - Opacity ensures labels don't compete with main chart data
 * 
 * @param dataKeyName - The key from data objects to use for X-axis values
 */
export const GraphXAxis = ({ dataKeyName }: { dataKeyName: string }) => {
    const { theme } = useTheme()
    return (
        <XAxis dataKey={dataKeyName} tickLine={false} tick={{ fontSize: 12, fill: theme === 'dark' ? '#FFFFFF66' : '#1C1C1C66', dy: 8, fontWeight: 400 }} />
    )
}