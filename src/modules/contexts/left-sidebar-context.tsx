import { createContext, useCallback, useContext, useState, useEffect } from "react";

/**
 * Left Sidebar Context
 * 
 * This context manages the state of the left sidebar with intelligent responsive behavior.
 * I've implemented automatic sidebar state management based on screen size to provide
 * the best user experience across all devices.
 * 
 * Key features:
 * - Automatic open/close based on screen size (desktop: open, mobile: closed)
 * - Media query listener for responsive behavior
 * - Memoized toggle function to prevent unnecessary re-renders
 * - Proper cleanup of event listeners to prevent memory leaks
 * - Error handling for context usage outside provider
 */
const LeftSidebarContext = createContext<LeftSidebarContextType | null>(null)

export const useLeftSidebar = () => {
    const context = useContext(LeftSidebarContext)
    if (context === null) {
        throw new Error("useLeftSidebar must be used within a LeftSidebarProvider")
    }
    return context;
}

type LeftSidebarContextType = {
    isLeftSidebarOpen: boolean;
    toggleLeftSidebar: () => void;
}

export const LeftSidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)'); // md breakpoint

        const handleResize = (e: MediaQueryListEvent) => {
            setIsLeftSidebarOpen(e.matches);
        };

        // Set initial state based on current screen size
        setIsLeftSidebarOpen(mediaQuery.matches);

        // Add event listener for screen size changes
        mediaQuery.addEventListener('change', handleResize);

        // Cleanup
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    const toggleLeftSidebar = useCallback(() => {
        setIsLeftSidebarOpen(prev => !prev)
    }, [])

    const value = {
        isLeftSidebarOpen,
        toggleLeftSidebar
    }

    return (
        <LeftSidebarContext.Provider value={value}>
            {children}
        </LeftSidebarContext.Provider>
    )
}