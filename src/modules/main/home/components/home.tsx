import { useTheme } from "../../../contexts/theme-context"
import { OverallDetails } from "../overall-details/components/overall-details"
import { ProjectionsVsActualsGraph } from "../projections-vs-actuals-graph/components/projections-vs-actual-graph"
import { RevenueByLocationMap } from "../revenue-by-location-map/components/revenue-by-location-map"
import { RevenueGraph } from "../revenue-graph/components/revenue-graph"
import { TopSellingProducts } from "../top-selling-products-table/components/top-selling-products"
import { TotalSalesPieChart } from "../total-sales-pie-chart/components/total-sales-pie-chart"

/**
 * Home Dashboard Component
 * 
 * This is the main dashboard view that displays various analytics components in a
 * responsive grid layout. I've designed this with a mobile-first approach using
 * Tailwind CSS grid system for optimal viewing across all device sizes.
 * 
 * Layout Strategy:
 * - Single column on mobile for better readability
 * - Two-column layout for key metrics on larger screens
 * - Four-column layout with 3:1 ratio for detailed charts
 * - Consistent spacing using responsive gap classes
 * 
 * Component Organization:
 * - Each widget is a separate component for better maintainability
 * - Theme-aware styling for consistent dark/light mode experience
 * - Modular structure allows easy addition/removal of widgets
 */
export const Home = () => {
    const { theme } = useTheme()
    return (
        <div className="sm:gap-7 flex flex-col gap-4 font-semibold">
            <p className={`px-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>eCommerce</p>
            <div className="sm:gap-7 flex flex-col gap-4">
                {/* Top row: Key metrics and projections chart */}
                <div className="xl:grid-cols-2 sm:gap-7 grid grid-cols-1 gap-4">
                    <OverallDetails />
                    <ProjectionsVsActualsGraph />
                </div>
                {/* Middle row: Revenue chart (3/4 width) and location map (1/4 width) */}
                <div className="xl:grid-cols-4 sm:gap-7 grid grid-cols-1 gap-4">
                    <div className="xl:col-span-3">
                        <RevenueGraph />
                    </div>
                    <RevenueByLocationMap />
                </div>
                {/* Bottom row: Products table (3/4 width) and sales pie chart (1/4 width) */}
                <div className="xl:grid-cols-4 sm:gap-7 grid grid-cols-1 gap-4">
                    <div className="xl:col-span-3">
                        <TopSellingProducts />
                    </div>
                    <TotalSalesPieChart />
                </div>
            </div>
        </div>
    )
}