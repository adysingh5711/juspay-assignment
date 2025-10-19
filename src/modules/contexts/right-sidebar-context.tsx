import { createContext, useCallback, useContext, useState, useEffect } from "react";

/**
 * Right Sidebar Context
 * 
 * This context manages the state of the right sidebar with intelligent responsive behavior.
 * It follows the same pattern as the left sidebar context for consistency and provides
 * automatic state management based on screen size.
 * 
 * Key features:
 * - Automatic open/close based on screen size (desktop: open, mobile: closed)
 * - Media query listener for responsive behavior
 * - Memoized toggle function to prevent unnecessary re-renders
 * - Proper cleanup of event listeners to prevent memory leaks
 * - Error handling for context usage outside provider
 */
const RightSidebarContext = createContext<RightSidebarContextType | null>(null)

export const useRightSidebar = () => {
    const context = useContext(RightSidebarContext)
    if (context === null) {
        throw new Error("useLeftSidebar must be used within a LeftSidebarProvider")
    }
    return context;
}

type RightSidebarContextType = {
    isRightSidebarOpen: boolean;
    toggleRightSidebar: () => void;
}

export const RightSidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)'); // md breakpoint

        const handleResize = (e: MediaQueryListEvent) => {
            setIsRightSidebarOpen(e.matches);
        };

        // Set initial state based on current screen size
        setIsRightSidebarOpen(mediaQuery.matches);

        // Add event listener for screen size changes
        mediaQuery.addEventListener('change', handleResize);

        // Cleanup
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    const toggleRightSidebar = useCallback(() => {
        setIsRightSidebarOpen(prev => !prev)
    }, [])

    const value = {
        isRightSidebarOpen,
        toggleRightSidebar
    }

    return (
        <RightSidebarContext.Provider value={value}>
            {children}
        </RightSidebarContext.Provider>
    )
}