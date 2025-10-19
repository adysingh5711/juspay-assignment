import { useRightSidebar } from "../../contexts/right-sidebar-context"
import { useRightSidebarSections } from "../../contexts/right-sidebar-sections-context"
import { Sidebar } from "../../../components/sidebar";
import { Notifications } from "./notifications/notifications";
import { Activities } from "./activities/activites";
import { Contacts } from "./contacts/contacts";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Right Sidebar Component
 * 
 * This component renders the dynamic right sidebar with reorderable sections.
 * I've implemented sophisticated animations using Framer Motion to provide
 * smooth transitions when sections are reordered by user interaction.
 * 
 * Key features:
 * - Dynamic section ordering based on user interaction
 * - Staggered animations for visual hierarchy
 * - AnimatePresence for smooth enter/exit transitions
 * - Layout animations for smooth reordering
 * - Responsive width with custom breakpoints
 * 
 * Animation strategy:
 * - Each section animates independently with staggered delays
 * - Animation key ensures re-animation on section reorder
 * - Layout prop enables smooth position transitions
 * - Contacts section remains fixed at bottom for consistency
 * 
 * Design decisions:
 * - Notifications and Activities can be reordered for user preference
 * - Contacts always stays at the bottom as it's reference information
 * - Smooth animations enhance perceived performance
 */
export const RightSidebar = () => {
    const { isRightSidebarOpen } = useRightSidebar();
    const { sectionOrder, animationKey } = useRightSidebarSections();
    return (
        <Sidebar direction="right" isOpen={isRightSidebarOpen} width=" w-[100vw] custom-md:w-[50vw] md:w-[280px]">
            <div className="flex flex-col gap-4 sm:gap-6 text-sm w-full">
                <AnimatePresence mode="wait">
                    {sectionOrder.map((section, index) => {
                        const delay = index * 0.1;
                        return (
                            <motion.div
                                key={`${section}-${animationKey}`}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{
                                    duration: 0.4,
                                    delay,
                                    ease: "easeInOut"
                                }}
                                layout
                            >
                                {section === 'notifications' && <Notifications />}
                                {section === 'activities' && <Activities />}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        delay: 0.3,
                        ease: "easeInOut",
                        scale: {
                            duration: 0.3,
                            ease: "easeOut"
                        }
                    }}
                    layout
                >
                    <Contacts />
                </motion.div>
            </div>
        </Sidebar>
    )
}