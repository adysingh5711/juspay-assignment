// src/components/eCommerce/total-sales/TotalSalesChart.jsx
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';
import { TotalSalesData } from '../data/total-sales-data';
import { useTheme } from '../../../../contexts/theme-context';
import { motion } from 'framer-motion';
import { useState } from 'react';

const TotalSalesChart = () => {
  const { theme } = useTheme()
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const totalValue = TotalSalesData.reduce((sum, entry) => sum + entry.value, 0);

  const renderCustomizedLabel = ({ cx, cy }: { cx: number; cy: number }) => {
    if (hoveredSegment === null) return null;

    const segment = TotalSalesData[hoveredSegment];
    const percentage = (segment.value / totalValue) * 100;

    return (
      <Text
        x={cx}
        y={cy}
        dy={5}
        textAnchor="middle"
        fill={theme === 'dark' ? "#FFFFFF" : "#000000"}
        className="text-sm font-semibold bg-gray-700 px-3 py-1 rounded"
      >
        {`${percentage.toFixed(1)}%`}
      </Text>
    );
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-4 sm:gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] flex justify-center items-center relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={TotalSalesData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={4}
              dataKey="value"
              animationDuration={500}
              label={renderCustomizedLabel}
              labelLine={false}
              onMouseEnter={(_, index) => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
              cornerRadius={-12}
            >
              {
                TotalSalesData?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={theme === 'dark' ? entry.darkModeColor : entry.color}
                    style={{ cursor: 'pointer' }}
                  />
                ))
              }
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* The percentage text overlay - only show when hovering */}
        {hoveredSegment !== null && (
          <motion.div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-700'} text-white px-3 py-1 rounded-[4px] font-semibold text-sm`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {`${((TotalSalesData[hoveredSegment].value / totalValue) * 100).toFixed(1)}%`}
          </motion.div>
        )}
      </motion.div>

      {/* Legend */}
      <motion.div
        className={`flex flex-col gap-3 sm:gap-4 w-full font-thin ${theme === 'dark' ? 'text-white/80' : 'text-black'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {TotalSalesData?.map((entry, index) => (
          <motion.div
            key={`legend-${index}`}
            className={`flex items-center justify-between text-sm ${theme === 'dark' ? 'text-white/80' : 'text-black'} cursor-pointer hover:opacity-80 transition-opacity`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
            onMouseEnter={() => setHoveredSegment(index)}
            onMouseLeave={() => setHoveredSegment(null)}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme === 'dark' ? entry.darkModeColor : entry.color }}></span>
              <span className="truncate">{entry.name}</span>
            </div>
            <span className="font-thin">${entry.value.toFixed(2)}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TotalSalesChart;