/**
 * Details Type Interface
 * 
 * This interface defines the structure for dashboard metric cards displayed in the
 * overall details section. I've designed this to support both light and dark themes
 * with separate color properties for each mode.
 * 
 * Design considerations:
 * - Separate color properties for light/dark themes ensure proper contrast
 * - ChangeType union type provides type safety for trend indicators
 * - Percentage change as number allows for precise calculations
 * - String values for display flexibility (can include currency symbols, etc.)
 */
export interface DetailsType {
    id: string;
    title: string;
    value: string;
    color: string;
    darkModeColor: string;
    percentageChange: number;
    textColor: string;
    darkModeTextColor: string;
    changeType: "positive" | "negative" | "neutral";
}