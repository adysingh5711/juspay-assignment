import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { LayoutContainer } from './modules/components/layout-container'

// Lazy load route components for code splitting
const Home = lazy(() => import('./modules/main/home/components/home').then(module => ({ default: module.Home })))
const OrderList = lazy(() => import('./modules/main/order-list/components/order-list').then(module => ({ default: module.OrderList })))

// Loading component for Suspense fallback
const RouteLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin w-8 h-8 border-b-2 border-gray-900 rounded-full"></div>
  </div>
)

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
        element: (
          <Suspense fallback={<RouteLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'dashboard/order-list',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <OrderList />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/dashboard/default" replace />,
      },
    ],
  },
]) 