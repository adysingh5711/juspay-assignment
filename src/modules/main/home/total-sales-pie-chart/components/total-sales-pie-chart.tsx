import { DataContainer } from "../../components/data-container"
import TotalSalesChart from "./pie-chart"

const headingChild = <p className="font-semibold text-sm">Total Sales</p>

const graphChild = () => {
    return <TotalSalesChart />
}

export const TotalSalesPieChart = () => {
    return(
        <DataContainer headingChild={headingChild} graphChild={graphChild()} />
    )
}