import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

/**
 * Main App Component
 * 
 * This is the root component that initializes the React Router.
 * I chose to use React Router v6 for its modern API and better TypeScript support.
 * The router configuration is separated into its own module for better organization
 * and maintainability, following the single responsibility principle.
 */
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default App; 