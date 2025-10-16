import { ActivitiesType } from "../../types/activites-type"
import { useTheme } from "../../../contexts/theme-context"
import { motion } from "framer-motion"

export const ActivitesItem = ({item}:{item:ActivitiesType}) => {
    const {theme} = useTheme();
    return(
        <motion.div 
            className={`p-1 rounded-[8px] flex gap-2 w-full cursor-pointer transition-all duration-200 ease-in-out ${theme === 'dark' ? 'hover:bg-white/15' : 'hover:bg-neutral-100'}`}
            whileHover={{ 
                scale: 1.01, 
                y: -1,
                transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ 
                scale: 0.99,
                transition: { duration: 0.1 }
            }}
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div 
                className="w-6 h-6 rounded-full bg-neutral-100"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.2 }}
            >
                <img src={item.avatar} alt={item.title} className="w-6 h-6 rounded-full object-contain" />
            </motion.div>
            <div className="flex flex-col w-full rounded-[8px] min-w-0">
                <p className="truncate w-full">{item.title}</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{item.time}</p>
            </div>
        </motion.div>  
    )
}