import { CaretRight } from "phosphor-react"
import { ListType } from "../types/list-type"
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import { useTheme } from "../../contexts/theme-context"
import { motion, AnimatePresence } from "framer-motion"

/**
 * SubListItem Component
 * 
 * This component renders a nested list item within a collapsible menu section.
 * I've added subtle animations and hover effects to enhance user interaction.
 * 
 * Key features:
 * - Staggered entrance animations for visual hierarchy
 * - Theme-aware hover states with proper contrast
 * - Animated indicator bar on hover
 * - Responsive text truncation to prevent overflow
 * 
 * @param item - The sub-item data containing id and name
 * @param theme - Current theme ('light' or 'dark')
 * @param index - Item index for staggered animations
 */
export const SubListItem = ({ item, theme, index }: { item: { id: string; name: string }, theme: string, index: number }) => {
    const [hovered, setHovered] = useState(false)
    return (
        <motion.div
            className={`flex gap-2 items-center rounded-[8px] py-1 pr-2 w-full ${theme === 'dark' ? 'hover:bg-white/15' : 'hover:bg-neutral-100'} cursor-pointer`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeOut"
            }}
        >
            <div className="flex items-center">
                <div className={`w-1 h-4 rounded-full ${hovered ? theme === 'dark' ? 'bg-white' : 'bg-black' : 'bg-transparent'}`}></div>
                <div className="size-4"></div>
            </div>
            <p className="text-sm truncate w-full min-w-0">{item.name}</p>
        </motion.div>
    )
}

/**
 * CollapsibleListItem Component
 * 
 * This component renders a collapsible menu item with optional sub-items and navigation.
 * I've implemented smooth expand/collapse animations and proper route handling for
 * an intuitive navigation experience.
 * 
 * Key features:
 * - Collapsible sub-menu with smooth height animations
 * - Active route highlighting with visual indicator
 * - Hover states with theme-aware styling
 * - Navigation integration with React Router
 * - Accessible click handling for both navigation and expansion
 * 
 * Behavior:
 * - Items without sub-lists navigate directly to their route
 * - Items with sub-lists toggle expansion on click
 * - Active state is determined by current route matching
 * 
 * @param list - The list item data including icon, name, and optional sub-items
 */
export const CollapsibleListItem = ({ list }: { list: ListType }) => {
    const [caretOpen, setCaretOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const { theme } = useTheme()
    const [hovered, setHovered] = useState(false)
    const toggleCaret = () => {
        setCaretOpen(caretOpen => !caretOpen)
    }

    const handleItemClick = () => {
        if (list.id === 'default') {
            navigate('/dashboard/default')
        } else if (list.id === 'order-list') {
            navigate('/dashboard/order-list')
        } else {
            toggleCaret()
        }
    }

    const isActive = () => {
        if (list.id === 'default') {
            return currentPath === '/dashboard/default' || currentPath === '/'
        } else if (list.id === 'order-list') {
            return currentPath === '/dashboard/order-list'
        }
        return false
    }

    return (
        <div className="flex flex-col w-full">
            <div className={`flex items-center cursor-pointer rounded-[8px] py-1 pr-2 w-full ${isActive() || hovered ? theme === 'dark' ? 'bg-white/10' : 'bg-black/5' : ''}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={handleItemClick}>
                <div className="flex items-center">
                    <div className={`w-1 h-4 rounded-full ${isActive() || hovered ? theme === 'dark' ? 'bg-[#C6C7F8]' : 'bg-black' : 'bg-transparent'}`}></div>
                    {!list.subList && <div className="size-4"></div>}
                </div>
                {list.subList &&
                    <div className="pl-1 cursor-pointer">
                        <CaretRight size={14} className={`text-neutral-400 transition-transform duration-500 ${caretOpen ? "rotate-90" : ""}`} />
                    </div>
                }
                <div
                    className={`flex items-center gap-1 flex-1 cursor-pointer rounded-[8px] px-1  transition-all duration-200`}
                // onClick={handleItemClick}
                >
                    <list.icon size={16} weight="duotone" />
                    <p className={`text-sm `}>{list.name}</p>
                </div>
            </div>
            <AnimatePresence>
                {caretOpen && list.subList && (
                    <motion.div
                        className="flex flex-col gap-1 pl-4"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                    >
                        {list.subList?.map((item, index) => (
                            <SubListItem key={item.id} item={item} theme={theme} index={index} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}