import { DataContainer } from "../../components/data-container"
import { TopSellingProductsTableColumns } from "../constants/top-selling-products-table-columns"
import { TopSellingProductsTableData } from "../data/top-selling-products-table-data"
import { Table } from "../../../../../components/table"
import { motion } from "framer-motion"

const headingChild = <p className="font-semibold text-sm">Top Selling Products</p>

const graphChild = () => {
    return(
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Table columns={TopSellingProductsTableColumns} data={TopSellingProductsTableData} />
        </motion.div>
    )
}

export const TopSellingProducts = () => {
    return(
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <DataContainer headingChild={headingChild} graphChild={graphChild()} />
        </motion.div>
    )
}