import { useTheme } from "../../../contexts/theme-context"
import { motion } from "framer-motion"

export const DataContainer = ({headingChild, graphChild, legendChild, justifyCenter=false}:{headingChild:React.ReactNode, graphChild:React.ReactNode, legendChild?:React.ReactNode, justifyCenter?:boolean}) => {
    const {theme} = useTheme()
    return(
        <motion.div 
            className={`${theme === 'dark' ? 'bg-white/5' : 'bg-[#F7F9FB]'} p-4 sm:p-6 rounded-[16px] flex flex-col gap-4 ${justifyCenter ? 'justify-center': "justify-start"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ 
                y: -2,
                transition: { duration: 0.2 }
            }}
        >
            <motion.div 
                className={`${theme === 'dark' ? 'text-white' : 'text-black'} flex items-center gap-4`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                {headingChild}
                {legendChild && (
                    <>
                        <div className="w-px h-4 bg-gray-300"></div>
                        {legendChild}
                    </>
                )}
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                {graphChild}
            </motion.div>
        </motion.div>
    )
}