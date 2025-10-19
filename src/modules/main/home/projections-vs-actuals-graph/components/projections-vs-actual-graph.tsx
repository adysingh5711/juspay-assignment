import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';
import { StackedGraphData } from '../data/stacked-graph-data';
import { GraphXAxis } from '../../../../../components/graph/x-axis';
import { GraphYAxis } from '../../../../../components/graph/y-axis';
import { GraphCartesianGrid } from '../../../../../components/graph/cartesian-grid';
import { DataContainer } from '../../components/data-container';
import { useTheme } from '../../../../contexts/theme-context';
import { motion } from 'framer-motion';

/**
 * Projections vs Actuals Graph Component
 * 
 * This component visualizes projected vs actual values using a dual-bar chart.
 * I've chosen overlapping bars with different opacities to create a visual
 * comparison that's easy to understand at a glance.
 * 
 * Key features:
 * - Dual-bar chart with overlapping bars for direct comparison
 * - Theme-aware bar colors with adjusted opacity
 * - Custom tooltip with formatted values
 * - Rounded bar corners for modern aesthetic
 * - Smooth entrance animations
 * - Responsive sizing with proper aspect ratios
 * 
 * Design decisions:
 * - Lighter projection bars behind darker actual bars
 * - Overlapping bars (negative barGap) to save horizontal space
 * - Consistent styling with other graph components
 * - Custom tooltip animations for smooth interactions
 * 
 * Performance optimization:
 * - Uses Recharts' built-in performance features
 * - Efficient re-rendering with proper key management
 */

const headingChild = <p className='text-sm font-semibold'>Projections vs Actuals</p>

const graphChild = ({ theme }: { theme: string }) => {
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
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
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="text-xs p-1 flex items-center gap-1" style={{ color: theme === 'dark' ? 'white' : 'black' }}>
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
            <ResponsiveContainer width="100%" height={150} className="sm:min-h-[168px] -ml-6">
                <BarChart data={StackedGraphData} barCategoryGap={-20} barGap={-20}>
                    <GraphCartesianGrid />
                    <GraphXAxis dataKeyName="month" />
                    <GraphYAxis />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: 'transparent' }}
                    />
                    <Bar dataKey="projection" fill="#CFDFEB" barSize={20} radius={[4, 4, 0, 0]} opacity={0.85} className={`${theme === 'dark' ? 'fill-[#CFDFEB]/50' : 'fill-[#CFDFEB]'}`} name="Projection" />
                    <Bar dataKey="actual" fill="#A8C5DA" barSize={20} className={`${theme === 'dark' ? 'fill-[#A8C5DA]/80' : 'fill-[#A8C5DA]'}`} name="Actual" />
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export const ProjectionsVsActualsGraph = () => {
    const { theme } = useTheme()
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <DataContainer headingChild={headingChild} graphChild={graphChild({ theme })} justifyCenter={true} />
        </motion.div>
    );
}