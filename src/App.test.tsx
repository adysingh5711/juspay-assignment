import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the router module to avoid routing complexity in tests
jest.mock('./router', () => ({
  router: {
    routes: [
      {
        path: '/',
        element: <div data-testid="mock-router">Mock Router Content</div>
      }
    ]
  }
}));

// Mock Vercel Analytics components
jest.mock('@vercel/analytics/react', () => ({
  Analytics: () => <div data-testid="analytics" />
}));

jest.mock('@vercel/speed-insights/react', () => ({
  SpeedInsights: () => <div data-testid="speed-insights" />
}));

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('includes Analytics component', () => {
    render(<App />);
    expect(screen.getByTestId('analytics')).toBeInTheDocument();
  });

  test('includes SpeedInsights component', () => {
    render(<App />);
    expect(screen.getByTestId('speed-insights')).toBeInTheDocument();
  });

  test('renders RouterProvider with correct structure', () => {
    render(<App />);
    // The RouterProvider should be present (mocked as mock-router)
    expect(screen.getByTestId('mock-router')).toBeInTheDocument();
  });
});