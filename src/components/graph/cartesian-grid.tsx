import { CartesianGrid } from "recharts"
import { useTheme } from "../../modules/contexts/theme-context"

/**
 * GraphCartesianGrid Component
 * 
 * A reusable Cartesian grid component for all charts in the application.
 * I've customized this to provide consistent styling across all graphs while
 * supporting theme variations.
 * 
 * Key design decisions:
 * - Horizontal lines only (vertical={false}) for cleaner appearance
 * - Subtle dashed lines using strokeDasharray="3 0" pattern
 * - Theme-aware stroke colors with proper contrast
 * - Darker grid lines in dark mode for visibility
 * - Consistent styling promotes visual coherence
 * 
 * Usage:
 * This component should be used in all Recharts chart components that need
 * a background grid for better data readability.
 */
export const GraphCartesianGrid = () => {
    const { theme } = useTheme()
    const strokeColor = theme === 'dark' ? "#FFFFFF66" : "#E5E7EB"
    return (
        <CartesianGrid strokeDasharray="3 0" vertical={false} stroke={strokeColor} />
    )
}