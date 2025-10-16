import { Separator } from "../../../../components/separator"
import { ActivitiesData } from "../../data/activities-data"
import { Heading } from "../heading"
import { ActivitesItem } from "./activities-item"
import { useTheme } from "../../../contexts/theme-context"
import { motion } from "framer-motion"

export const Activities = () => {
    const {theme} = useTheme();
    return(
        <div className="flex flex-col gap-2">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Heading title="Activities" />
            </motion.div>
            <div className="flex flex-col">
                {ActivitiesData.map((item, index) => (
                    <motion.div 
                        key={item.id} 
                        className="flex flex-col"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    >
                        <ActivitesItem item={item} />
                        {index !== ActivitiesData.length - 1 && (
                            <div className="pl-[14px] -mt-2 mb-1">
                                <Separator direction="vertical" color={theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} length="h-[14px]" />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}