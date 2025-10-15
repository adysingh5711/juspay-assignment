import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

/**
 * Main App Component
 * 
 * This is the root component that initializes the React Router.
 * I chose to use React Router v6 for its modern API and better TypeScript support.
 * The router configuration is separated into its own module for better organization
 * and maintainability, following the single responsibility principle.
 */
const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App; 