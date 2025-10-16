import { DetailsType } from "../types/details-type";

/**
 * Overall Details Data
 * 
 * This file contains mock data for the key performance indicators displayed
 * in the dashboard's overview section. I've designed this data structure to
 * support both light and dark themes with appropriate color schemes.
 * 
 * Data structure considerations:
 * - Each metric has separate colors for light/dark modes
 * - Percentage changes include both positive and negative values
 * - Change types are strictly typed for consistent UI rendering
 * - Values are formatted as strings to support currency symbols and units
 * - Color choices follow accessibility guidelines for proper contrast defined by the design system in Figma
 */
export const OverallDetailsData: DetailsType[] = [
    {
        id: "1",
        title: "Customers",
        value: "3,781",
        color: "bg-[#E3F5FF]",
        darkModeColor: "bg-[#E3F5FF]",
        percentageChange: 11.01,
        textColor: "text-black",
        darkModeTextColor: "text-black",
        changeType: "positive"
    },
    {
        id: "2",
        title: "Orders",
        value: "1,219",
        color: "bg-[#F7F9FB]",
        darkModeColor: "bg-white/5",
        percentageChange: 0.03,
        textColor: "text-black",
        darkModeTextColor: "text-white",
        changeType: "negative"
    },
    {
        id: "3",
        title: "Revenue",
        value: "$695",
        color: "bg-[#F7F9FB]",
        darkModeColor: "bg-white/5",
        percentageChange: 15.03,
        textColor: "text-black",
        darkModeTextColor: "text-white",
        changeType: "positive"
    },
    {
        id: "4",
        title: "Growth",
        value: "30.1%",
        color: "bg-[#E5ECF6]",
        darkModeColor: "bg-[#E5ECF6]",
        percentageChange: 6.08,
        textColor: "text-black",
        darkModeTextColor: "text-black",
        changeType: "positive"
    },
]