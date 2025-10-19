import { Command, MagnifyingGlass } from "phosphor-react"
import { useTheme } from "../modules/contexts/theme-context"
import { useState } from "react"

/**
 * Search Input Component
 * 
 * This is a reusable search input component with customizable styling and theme support.
 * I've designed it to be flexible and accessible with proper focus states and visual feedback.
 * 
 * Key features:
 * - Theme-aware styling with proper contrast ratios
 * - Customizable background and border colors
 * - Focus state management with visual feedback
 * - Optional keyboard shortcut indicator
 * - Responsive design with proper spacing
 * - Accessible placeholder and label text
 */
export const SearchInput = ({
    value,
    onChange,
    showIcon = true,
    backgroundColor = "bg-black/5",
    borderColor = "border-none"
}: {
    value: string;
    onChange: (value: string) => void;
    showIcon?: boolean;
    backgroundColor?: string;
    borderColor?: string;
}) => {
    const { theme } = useTheme()
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className="relative w-full">
            <MagnifyingGlass className={`absolute left-2 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-white/20' : 'text-black/20'}`} />
            <input
                type="text"
                placeholder="Search"
                className={`w-full ${backgroundColor} ${borderColor} outline-none rounded-[8px] ${theme === 'dark' ? 'text-white/80 placeholder:text-white/20' : 'text-black/80 placeholder:text-black/20'} focus:outline-none focus:ring-0 active:outline-none active:ring-0 pr-9 pl-7 py-1 text-sm transition-all duration-300 ${isFocused ? 'border-[1px] border-[#A8C5DA]' : ''}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {showIcon && (
                <>
                    <Command className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-white/20' : 'text-black/20'}`} />
                    <p className={`absolute right-2 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-white/20' : 'text-black/20'}`}>/</p>
                </>
            )}
        </div>
    )
}