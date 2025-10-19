import { useEffect, useState } from "react";
import { useRightSidebar } from "../../../../contexts/right-sidebar-context";
import { OverallDetailsData } from "../data/overall-details-data"
import { DetailCard } from "./detail-card"
import { useLeftSidebar } from "../../../../contexts/left-sidebar-context"

/**
 * OverallDetails Component
 * 
 * This component renders a responsive grid of key performance indicator (KPI) cards.
 * I've implemented intelligent layout switching based on sidebar states to ensure
 * optimal card sizing and readability in all viewport configurations.
 * 
 * Key features:
 * - Adaptive grid layout based on available horizontal space
 * - Monitors both sidebar states to determine optimal column count
 * - Responsive breakpoints for mobile, tablet, and desktop
 * - Smooth layout transitions when sidebars toggle
 * 
 * Layout strategy:
 * - When both sidebars are open: single column on small screens, 2 columns on large
 * - When one/both sidebars closed: 2 columns on small screens, 2 columns on large
 * - Mobile (default): always single column for better readability
 * 
 * This approach maximizes space efficiency while maintaining visual clarity.
 */
export const OverallDetails = () => {
    const { isLeftSidebarOpen } = useLeftSidebar();
    const { isRightSidebarOpen } = useRightSidebar();
    const [bothSidebarsOpen, setBothSidebarsOpen] = useState(true)

    useEffect(() => {
        if (isLeftSidebarOpen && isRightSidebarOpen) {
            setBothSidebarsOpen(true)
        } else {
            setBothSidebarsOpen(false)
        }
    }, [isLeftSidebarOpen, isRightSidebarOpen])
    return (
        <div className={`grid grid-cols-1 lg:grid-cols-2 ${bothSidebarsOpen ? "sm:grid-cols-1" : "sm:grid-cols-2"} gap-4 sm:gap-7`}>
            {OverallDetailsData?.map((detail) => (
                <DetailCard
                    key={detail.id}
                    detail={detail}
                />
            ))}
        </div>
    )
}