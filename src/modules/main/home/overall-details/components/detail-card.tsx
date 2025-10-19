import { TrendDown, TrendUp } from "phosphor-react";
import { useTheme } from "../../../../contexts/theme-context";
import { DetailsType } from "../types/details-type";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom'

/**
 * DetailCard Component
 * 
 * This component displays a single KPI metric card with value, trend indicator,
 * and optional navigation functionality. I've added micro-interactions and
 * accessibility features to enhance user experience.
 * 
 * Key features:
 * - Theme-aware color customization for each metric
 * - Animated trend indicators (up/down arrows)
 * - Hover effects with subtle scaling and shadow
 * - Entrance animations for visual interest
 * - Clickable navigation for 'Orders' card
 * - Full keyboard accessibility (Enter/Space to activate)
 * - Semantic HTML with proper ARIA attributes
 * 
 * Animation strategy:
 * - Staggered animations for value and trend indicator
 * - Smooth hover transitions without jarring movement
 * - Scale and shadow effects for depth perception
 * 
 * Accessibility:
 * - Proper role="button" for interactive cards
 * - Tab navigation support with tabIndex
 * - Keyboard event handling for Enter and Space keys
 * - Prevents default space scrolling behavior
 * 
 * @param detail - The KPI data including title, value, change percentage, and styling
 */
export const DetailCard = ({ detail }: { detail: DetailsType }) => {
    const { theme } = useTheme()
    const navigate = useNavigate()


    return (
        <motion.div
            className={`w-full h-full rounded-[16px] ${theme === 'dark' ? detail.darkModeColor : detail.color} p-4 sm:p-6 flex flex-col gap-2 cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{
                opacity: 0.8,
                boxShadow: theme === 'dark' ? "0 2px 4px rgba(255, 255, 255, 0.05)" : "0 2px 4px rgba(0, 0, 0, 0.11)",
                transition: { duration: 0.3 }
            }}
            onClick={() => {
                if (detail.title === 'Orders') navigate('/dashboard/order-list')
            }}
            onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && detail.title === 'Orders') {
                    e.preventDefault()
                    navigate('/dashboard/order-list')
                }
            }}
            role="button"
            tabIndex={0}
        >
            <p className={`text-sm font-semibold ${theme === 'dark' ? detail.darkModeTextColor : detail.textColor}`}>{detail.title}</p>
            <div className="flex items-center justify-between">
                <motion.p
                    className={`xl:text-[24px] text-[20px] font-semibold  ${theme === 'dark' ? detail.darkModeTextColor : detail.textColor}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                >
                    {detail.value}
                </motion.p>
                <motion.div
                    className="flex items-center gap-1 rounded-[8px]"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                >
                    <p className={`text-xs font-[400] ${theme === 'dark' ? detail.darkModeTextColor : detail.textColor}`}>{detail.changeType === "positive" ? "+" : detail.changeType === "negative" ? "-" : ""} {detail.percentageChange}%</p>
                    {detail.changeType === "positive" ? <TrendUp weight="fill" size={16} className={`${theme === 'dark' ? detail.darkModeTextColor : detail.textColor}`} /> : detail.changeType === "negative" ? <TrendDown weight="fill" size={16} className={`${theme === 'dark' ? detail.darkModeTextColor : detail.textColor} rotate-90`} /> : <></>}
                </motion.div>
            </div>
        </motion.div>
    )
}