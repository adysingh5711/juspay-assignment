import { LineChart, ResponsiveContainer, Line, Tooltip } from "recharts"
import { DataContainer } from "../../components/data-container"
import { RevenueData } from "../data/revenue-data"
import { GraphCartesianGrid } from "../../../../../components/graph/cartesian-grid"
import { GraphXAxis } from "../../../../../components/graph/x-axis"
import { GraphYAxis } from "../../../../../components/graph/y-axis"
import { useTheme } from "../../../../contexts/theme-context"
import { Separator } from "../../../../../components/separator"
import { motion } from "framer-motion"

/**
 * Revenue Graph Component
 * 
 * This component displays a sophisticated line chart showing revenue trends over time.
 * I've implemented a custom data processing approach to create a visual distinction
 * between actual data (solid line) and projected data (dashed line) for better UX.
 * 
 * Key design decisions:
 * - Split current data into solid/dashed lines to show actual vs projected
 * - Custom tooltip with grouped data to avoid duplicates
 * - Theme-aware styling for consistent dark/light mode experience
 * - Responsive design using Recharts ResponsiveContainer
 * - Custom graph components for consistent styling across all charts
 */

const headingChild = <p className='text-sm font-semibold'>Revenue</p>

// Process data to create visual distinction between actual and projected values
const processedData = RevenueData.map((d, idx) => ({
    month: d.month,
    previous: d.previous,
    currentSolid: idx <= 3 ? d.current : null,  // Solid line for actual data
    currentDashed: idx >= 3 ? d.current : null  // Dashed line for projected data
}));


const graphChild = ({ theme }: { theme: string }) => {
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            // Filter out null values and combine current week data
            const filteredPayload = payload.filter((entry: any) => entry.value !== null);

            // Group by name to avoid duplicates
            const groupedData = filteredPayload.reduce((acc: any, entry: any) => {
                if (entry.name === "Current Week") {
                    if (!acc["Current Week"]) {
                        acc["Current Week"] = entry;
                    }
                } else {
                    acc[entry.name] = entry;
                }
                return acc;
            }, {});

            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`px-3 py-2 rounded-lg border border-black/10 shadow-[#A7C4D9] ${theme === 'dark'
                        ? 'bg-[#191919] text-white border-white/20'
                        : 'text-black bg-white'
                        }`}
                >
                    {Object.values(groupedData).map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-1 p-1 text-xs" style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                            <div className='w-2 h-2 rounded-full' style={{ backgroundColor: entry.color }}></div>
                            {entry.name}: <span className='font-thin'>${entry.value?.toLocaleString()}</span>
                        </div>
                    ))}
                </motion.div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <ResponsiveContainer width="100%" height={250} className="sm:h-[318px] -ml-6">
                <LineChart data={processedData}>
                    <GraphCartesianGrid />
                    <GraphXAxis dataKeyName="month" />
                    <GraphYAxis />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={false}
                    />

                    {/* Previous Week */}
                    <Line
                        type="natural"
                        dataKey="previous"
                        stroke="#A8C5DA"
                        strokeWidth={3}
                        dot={false}
                        name="Previous Week"
                    />

                    {/* Current Week solid */}
                    <Line
                        type="natural"
                        dataKey="currentSolid"
                        stroke={theme === 'dark' ? "#C6C7F8" : "#000000"}
                        strokeWidth={3}
                        dot={false}
                        connectNulls
                        name="Current Week"
                    />

                    {/* Current Week dashed */}
                    <Line
                        type="natural"
                        dataKey="currentDashed"
                        stroke={theme === 'dark' ? "#C6C7F8" : "#000000"}
                        strokeWidth={3}
                        dot={false}
                        strokeDasharray="5 5"
                        connectNulls
                        name="Current Week"
                    />
                </LineChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

const legendChild = ({ theme }: { theme: string }) => {
    // Calculate totals for the legend
    const currentTotal = processedData.reduce((sum, item) => {
        const current = item.currentSolid !== null ? item.currentSolid : item.currentDashed;
        return sum + (current || 0);
    }, 0);

    const previousTotal = processedData.reduce((sum, item) => sum + (item.previous || 0), 0);

    return (
        <motion.div
            className="flex items-center gap-4 text-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
        >
            <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.9 }}
            >
                <Separator direction="vertical" color={theme === 'dark' ? '#C6C7F8' : '#000000'} length="100%" />
                <div className={`w-2 h-2 rounded-full  ${theme === 'dark' ? 'bg-[#C6C7F8]' : 'bg-[#000000]'}`}></div>
                <p className="font-thin">Current Week <span className="font-semibold">${currentTotal.toLocaleString()}</span></p>
            </motion.div>
            <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1.0 }}
            >
                <div className={`w-2 h-2 rounded-full bg-[#A8C5DA]`}></div>
                <p className="font-thin">Previous Week <span className="font-semibold">${previousTotal.toLocaleString()}</span></p>
            </motion.div>
        </motion.div>
    );
};

export const RevenueGraph = () => {
    const { theme } = useTheme()
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <DataContainer
                headingChild={headingChild}
                graphChild={graphChild({ theme })}
                legendChild={legendChild({ theme })}
                justifyCenter={true}
            />
        </motion.div>
    )
}