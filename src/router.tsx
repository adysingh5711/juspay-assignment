import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LayoutContainer } from './modules/components/layout-container'
import { Home } from './modules/main/home/components/home'
import { OrderList } from './modules/main/order-list/components/order-list'

/**
 * Router Configuration
 * 
 * I've implemented a nested routing structure using React Router v6's createBrowserRouter.
 * This approach provides better performance and cleaner code organization compared to
 * the older Switch-based routing. The layout container wraps all routes to maintain
 * consistent UI structure (sidebar, navbar, etc.) across different pages.
 * 
 * Key design decisions:
 * - Default redirect to /dashboard/default for better UX
 * - Wildcard route (*) catches any undefined routes and redirects to default
 * - Nested structure allows for shared layout components
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutContainer />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/default" replace />,
      },
      {
        path: 'dashboard/default',
        element: <Home />,
      },
      {
        path: 'dashboard/order-list',
        element: <OrderList />,
      },
      {
        path: '*',
        element: <Navigate to="/dashboard/default" replace />,
      },
    ],
  },
]) 