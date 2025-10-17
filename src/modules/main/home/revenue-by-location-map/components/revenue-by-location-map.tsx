import { DataContainer } from "../../components/data-container"
import { RevenueMap } from "./revenue-map"
import { RevenueList } from "./revenue-list"
import { motion } from "framer-motion"

const headingChild = <p className='text-sm font-semibold'>Revenue by Location</p>
const graphChild = (
    <motion.div 
        className="flex flex-col gap-4 h-fit"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
    >
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
        >
            <RevenueMap />
        </motion.div>
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
        >
            <RevenueList />
        </motion.div>
    </motion.div>
)

export const RevenueByLocationMap = () => {
    return(
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <DataContainer headingChild={headingChild} graphChild={graphChild} />
        </motion.div>
    )
}