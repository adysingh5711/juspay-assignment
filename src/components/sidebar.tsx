import { useTheme } from "../modules/contexts/theme-context"
import { motion, AnimatePresence } from "framer-motion"

/**
 * Sidebar Component
 * 
 * This is a reusable sidebar component that can be used for both left and right sidebars.
 * I've designed it to be flexible and responsive with smooth animations and theme support.
 * 
 * Key features:
 * - Direction-aware animations (slides from left/right)
 * - Responsive width handling with custom breakpoints
 * - Theme-aware styling with proper contrast
 * - Smooth open/close animations using Framer Motion
 * - Overflow handling for long content
 * - Fixed positioning for consistent layout
 */
export const Sidebar = ({ direction, isOpen, children, width }: { direction: string; isOpen: boolean; children: React.ReactNode, width: string }) => {
    const { theme } = useTheme()
    return (
        <div className={`relative min-h-screen ${direction === 'right' ? 'border-l' : 'border-r'} ${theme === 'dark' ? 'bg-black/90 border-neutral-600 text-white' : 'bg-white border-black/10 text-black'} transition-all duration-500 ${isOpen ? `${width} ` : "w-0"}`}>
            <div className={`fixed h-screen py-5 overflow-y-auto overflow-x-hidden transition-all duration-500 ease-in-out ${isOpen ? `${width} ${direction === "right" ? "px-3 sm:px-5" : "px-2 sm:px-4"}` : "w-0"}`}>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: direction === "left" ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction === "left" ? -20 : 20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}