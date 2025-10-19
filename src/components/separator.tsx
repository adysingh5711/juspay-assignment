/**
 * Separator Component
 * 
 * A reusable separator component for creating horizontal or vertical dividers.
 * I've designed this to be highly flexible with customizable direction, color,
 * and length to accommodate various layout needs.
 * 
 * Key features:
 * - Support for horizontal and vertical orientations
 * - Customizable color via Tailwind classes
 * - Customizable length via Tailwind classes
 * - Minimal 1px thickness for subtle division
 * 
 * Usage examples:
 * - Horizontal: <Separator direction="horizontal" color="bg-gray-200" length="w-full" />
 * - Vertical: <Separator direction="vertical" color="bg-gray-300" length="h-full" />
 * 
 * @param direction - Orientation of the separator ('horizontal' or 'vertical')
 * @param color - Tailwind color class for the separator
 * @param length - Tailwind length class for the separator
 */
export const Separator = ({ direction, color, length }: { direction: "horizontal" | "vertical", color: string, length: string }) => {
    return (
        <div className={`${direction === "horizontal" ? `${length} h-[1px]` : `${length} w-[1px]`} ${color} `} />
    )
}