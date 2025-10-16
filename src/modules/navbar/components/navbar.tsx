import { Bell, Moon, Sidebar, Star, Sun, ClockCounterClockwise, MagnifyingGlass } from "phosphor-react"
import { SearchInput } from "../../../components/search-input"
import { useTheme } from "../../contexts/theme-context"
import { useLeftSidebar } from "../../contexts/left-sidebar-context"
import { useRightSidebar } from "../../contexts/right-sidebar-context"
import { useRightSidebarSections } from "../../contexts/right-sidebar-sections-context"
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"

/**
 * Navbar Component
 * 
 * This is the main navigation bar that provides access to all major features of the
 * dashboard. I've implemented a responsive design with intelligent state management
 * and smooth animations to enhance user experience.
 * 
 * Key features:
 * - Responsive search input (hidden on mobile, expandable on click)
 * - Theme toggle with smooth icon transitions
 * - Sidebar controls with proper state synchronization
 * - Breadcrumb navigation showing current page
 * - Notification bell with attention-grabbing animation
 * - Hover effects and micro-interactions for better UX
 * 
 * State management:
 * - Uses multiple contexts for sidebar states
 * - Local state for search visibility and animations
 * - useEffect hooks for responsive behavior
 */
export const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { toggleLeftSidebar, isLeftSidebarOpen } = useLeftSidebar();
    const { toggleRightSidebar, isRightSidebarOpen } = useRightSidebar();
    const { setNotificationsFirst, setActivitiesFirst } = useRightSidebarSections();
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();
    const currentPath = location.pathname;
    const [searchInputVisible, setSearchInputVisible] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)
    const animationTriggered = useRef(false)

    useEffect(() => {
        if (isLeftSidebarOpen || isRightSidebarOpen) {
            setSearchInputVisible(false)
        } else {
            setSearchInputVisible(true)
        }
    }, [isLeftSidebarOpen, isRightSidebarOpen])

    useEffect(() => {
        if (!animationTriggered.current) {
            animationTriggered.current = true
            setHasAnimated(true)
        }
    }, [])

    const handleSearchIconClick = () => {
        if (isLeftSidebarOpen) toggleLeftSidebar()
        if (isRightSidebarOpen) toggleRightSidebar()
        setSearchInputVisible(true)
    }

    const handleBellClick = () => {
        if (!isRightSidebarOpen) {
            toggleRightSidebar()
        }
        setNotificationsFirst()
    }

    const handleClockClick = () => {
        if (!isRightSidebarOpen) {
            toggleRightSidebar()
        }
        setActivitiesFirst()
    }

    const getCurrentPageName = () => {
        if (currentPath === '/dashboard/default' || currentPath === '/' || currentPath === '/dashboard') {
            return 'Default';
        } else if (currentPath === '/dashboard/order-list') {
            return 'Order List';
        }
        return 'Default';
    }
    return (
        <nav className={`h-[68px] sticky border-b py-5 px-2 lg:px-7 flex items-center justify-between gap-2 ${theme === 'dark' ? ' border-neutral-600 text-white' : 'bg-white border-black/10 text-black'} transition-all duration-500`}>
            <div className="flex items-center gap-2 lg:gap-4 text-sm">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    <Sidebar size={20} weight="duotone" className={`cursor-pointer ${theme === 'dark' ? 'text-white hover:text-[#A8C5DA]' : 'text-neutral-700 hover:text-[#4a7391]'} transition-all duration-300 ease-in-out`} onClick={toggleLeftSidebar} />
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    <Star size={20} weight="duotone" className={`cursor-pointer ${theme === 'dark' ? 'text-white hover:text-[#A8C5DA]' : 'text-neutral-700 hover:text-[#4a7391]'} transition-all duration-300 ease-in-out`} />
                </motion.div>
                <p className={`${theme === 'dark' ? 'text-white/40' : 'text-black/40'} hidden lg:block`}>Dashboards</p>
                <p className={`${theme === 'dark' ? 'text-white/40' : 'text-black/40'} hidden lg:block`}>/</p>
                <p className="truncate">{getCurrentPageName()}</p>
            </div>
            <div className="flex items-center gap-2 lg:gap-4 text-md">
                <div className={`w-[160px] hidden lg:block `}>
                    <SearchInput
                        value={searchTerm}
                        onChange={setSearchTerm}
                        backgroundColor={theme === 'dark' ? 'bg-white/10' : 'bg-black/5'}
                    />
                </div>
                <div className={`w-[160px] lg:hidden visible w-fit transition-all duration-300 ease-in-out`}>
                    {!searchInputVisible ?
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MagnifyingGlass size={20} className={`cursor-pointer ${theme === 'dark' ? 'text-white' : 'text-neutral-700'} hover:text-[#A8C5DA] transition-all duration-300 ease-in-out`} onClick={handleSearchIconClick} />
                        </motion.div>
                        :
                        <SearchInput
                            value={searchTerm}
                            onChange={setSearchTerm}
                            backgroundColor={theme === 'dark' ? 'bg-white/10' : 'bg-black/5'}
                        />
                    }
                </div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    {theme === "light" ? (
                        <Moon size={20} weight="duotone" className={`cursor-pointer ${theme === "light" ? 'text-neutral-700 hover:text-[#4a7391]' : 'text-white hover:text-[#A8C5DA]'} transition-all duration-300 ease-in-out`} onClick={toggleTheme} />
                    ) : (
                        <Sun size={20} weight="duotone" className={`cursor-pointer ${theme === 'dark' ? 'text-white hover:text-[#A8C5DA]' : 'text-neutral-700 hover:text-[#4a7391]'} transition-all duration-300 ease-in-out`} onClick={toggleTheme} />
                    )}
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    <ClockCounterClockwise size={20} weight="duotone" className={`cursor-pointer ${theme === 'dark' ? 'text-white hover:text-[#A8C5DA]' : 'text-neutral-700 hover:text-[#4a7391]'} hidden sm:block transition-all duration-300 ease-in-out`} onClick={handleClockClick} />
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={hasAnimated ? {
                        rotate: [0, -15, 15, -15, 15, -15, 15, 0],
                    } : {}}
                    transition={{
                        scale: { duration: 0.2 },
                        rotate: {
                            duration: 4,
                            ease: "easeInOut",
                            times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1]
                        }
                    }}
                >
                    <Bell
                        size={20}
                        weight="duotone"
                        className={`cursor-pointer ${theme === 'dark' ? 'text-white hover:text-[#A8C5DA]' : 'text-neutral-700 hover:text-[#4a7391]'} transition-all duration-300 ease-in-out`}
                        onClick={handleBellClick}
                    />
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    <Sidebar size={20} weight="duotone" className={`cursor-pointer ${theme === 'dark' ? 'text-white hover:text-[#A8C5DA]' : 'text-neutral-700 hover:text-[#4a7391]'} transition-all duration-300 ease-in-out`} onClick={toggleRightSidebar} />
                </motion.div>
            </div>
        </nav>
    )
}