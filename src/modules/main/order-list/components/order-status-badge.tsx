import React from 'react';
import { StatusType } from '../types/order-list-table-type';
import { OrderStatusColors } from '../constants/order-status-colors';
import { useTheme } from '../../../contexts/theme-context';

interface OrderStatusBadgeProps {
  status: StatusType;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const {theme} = useTheme()
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case 'complete':
        return {
          color: OrderStatusColors[status].textColor,
          dotColor: OrderStatusColors[status].bgColor,
          text: 'Complete'
        };
      case 'pending':
        return {
          color: OrderStatusColors[status].textColor,
          dotColor: OrderStatusColors[status].bgColor,
          text: 'Pending'
        };
      case 'inProgress':
        return {
          color: OrderStatusColors[status].textColor,
          dotColor: OrderStatusColors[status].bgColor,
          text: 'In Progress'
        };
      case 'approved':
        return {
          color: OrderStatusColors[status].textColor,
          dotColor: OrderStatusColors[status].bgColor,
          text: 'Approved'
        };
      case 'rejected':
        return {
          color: OrderStatusColors[status].textColor,
          dotColor: OrderStatusColors[status].bgColor,
          text: 'Rejected'
        };
      default:
        return {
          color: "text-neutral-600",
          dotColor: "bg-neutral-200",
          text: 'Unknown'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className="flex items-center">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${theme === 'dark' ? OrderStatusColors[status].darkModeTextColor || config.color : config.color}`}>
        <span className={`w-2 h-2 rounded-full mr-2 ${theme === 'dark' ? OrderStatusColors[status].darkModeBgColor || config.dotColor : config.dotColor}`}></span>
        {config.text}
      </span>
    </div>
  );
}; 