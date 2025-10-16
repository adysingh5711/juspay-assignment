import { Heading } from "../heading"
import { NotificationsData } from "../../data/notifications-data"
import { NotificationItem } from "./notification-item"
import { useRightSidebar } from "../../../contexts/right-sidebar-context"
import { X } from "phosphor-react"
import { useTheme } from "../../../contexts/theme-context"
import { motion } from "framer-motion"

export const Notifications = () => {
    const {toggleRightSidebar} = useRightSidebar();
    const {theme} = useTheme();
    return(
        <div className="flex flex-col gap-2 w-full">
            <motion.div 
                className="flex justify-between items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Heading title="Notifications" />
                <X size={16} className={`text-black/40 lg:hidden block ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`} onClick={()=>{toggleRightSidebar()}} />
            </motion.div>
            <div className="flex flex-col gap-2 w-full">
                {NotificationsData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    >
                        <NotificationItem item={item} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}