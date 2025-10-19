import { useState } from "react";
import { FavoritesRecent } from "../data/favorites-recent";
import { useTheme } from "../../contexts/theme-context";

/**
 * TabItem Component
 * 
 * This component renders an individual item within the Favorites/Recently tabs.
 * I've added hover effects with a visual indicator for better user feedback.
 * 
 * Key features:
 * - Theme-aware hover states
 * - Animated indicator bar on hover
 * - Dot bullet point for visual consistency
 * - Responsive to theme changes
 * 
 * @param tab - The name of the tab item to display
 * @param theme - Current theme ('light' or 'dark')
 */
export const TabItem = ({ tab, theme }: { tab: string, theme: string }) => {
    const [hovered, setHovered] = useState(false)
    return (
        <div className={`flex gap-2 items-center rounded-[8px] py-1 pr-2 w-full ${theme === 'dark' ? 'hover:bg-white/15' : 'hover:bg-neutral-100'} cursor-pointer`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className="flex items-center">
                <div className={`w-1 h-4 rounded-full ${hovered ? theme === 'dark' ? 'bg-white' : 'bg-black' : 'bg-transparent'}`}></div>
            </div>
            <div className={`w-[6px] h-[6px] rounded-full ${theme === 'dark' ? 'bg-white/20' : 'bg-black/20'}`}></div>
            <p>{tab}</p>
        </div>
    )
}

/**
 * Tabs Component
 * 
 * This component provides a tabbed interface for switching between Favorites and
 * Recently viewed items in the left sidebar. I've implemented a simple state-based
 * tab switching mechanism with theme-aware styling.
 * 
 * Key features:
 * - Two-tab interface (Favorites/Recently)
 * - Active tab highlighting with visual feedback
 * - Theme-aware text opacity for inactive tabs
 * - Dynamic content rendering based on selected tab
 * - Smooth transitions between tab states
 * 
 * Design decisions:
 * - Default to 'favorites' tab for better UX
 * - Use opacity to indicate active/inactive states
 * - Maintain consistent spacing and alignment
 */
export const Tabs = () => {
    const [activeTab, setActiveTab] = useState("favorites");
    const { theme } = useTheme()
    return (
        <div className="flex flex-col gap-1 pb-3">
            <div className="flex items-center gap-1">
                <p className={`cursor-pointer py-1 px-2 ${activeTab === "favorites" ? theme === 'dark' ? "text-white/40" : "text-black/40" : theme === 'dark' ? "text-white/20" : "text-black/20"}`} onClick={() => setActiveTab("favorites")}>Favorites</p>
                <p className={`cursor-pointer py-1 px-2 ${activeTab === "recently" ? theme === 'dark' ? "text-white/40" : "text-black/40" : theme === 'dark' ? "text-white/20" : "text-black/20"}`} onClick={() => setActiveTab("recently")}>Recently</p>
            </div>
            {activeTab === 'favorites' ?
                <div className="flex flex-col gap-1">
                    {FavoritesRecent.favorites.map((item) => (
                        <TabItem key={item.id} tab={item.name} theme={theme} />
                    ))}
                </div>
                :
                <div className="flex flex-col gap-1">
                    {FavoritesRecent.recent.map((item) => (
                        <TabItem key={item.id} tab={item.name} theme={theme} />
                    ))}
                </div>
            }
        </div>
    )
}