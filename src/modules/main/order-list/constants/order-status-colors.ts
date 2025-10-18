import { StatusType } from "../types/order-list-table-type";

export const OrderStatusColors: Record<StatusType, {textColor: string; bgColor: string, darkModeBgColor?: string, darkModeTextColor?: string}> = {
    complete: {textColor: "text-[#4AA785]", bgColor: "bg-[#4AA785]"},
    pending: {textColor: "text-[#59A8D4]", bgColor: "bg-[#59A8D4]"},
    inProgress: {textColor: "text-[#8A8CD9]", bgColor: "bg-[#8A8CD9]"},
    approved: {textColor: "text-[#FFC555]", bgColor: "bg-[#FFC555]"},
    rejected: {textColor: "text-[#1C1C1C66]", bgColor: "bg-[#1C1C1C66]", darkModeBgColor:"bg-white/60", darkModeTextColor:"text-white/60"}
}