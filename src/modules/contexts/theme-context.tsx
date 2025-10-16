import { createContext, useCallback, useContext, useState } from "react";

/**
 * Theme Context Implementation
 * 
 * I've implemented a custom theme context using React's Context API to manage
 * global theme state across the application. This approach provides better
 * performance than prop drilling and allows any component to access theme state.
 * 
 * Key design decisions:
 * - Used useCallback to memoize toggleTheme function to prevent unnecessary re-renders
 * - Implemented proper error handling for context usage outside provider
 * - TypeScript types ensure type safety for theme values
 * - Simple boolean toggle between light/dark modes for better UX
 */
const ThemeContext = createContext<ThemeContextType | null>(null)

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (context === null) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context;
}

type ThemeContextType = {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    // Default to light theme for better accessibility and user preference
    const [theme, setTheme] = useState<"light" | "dark">("light")

    // Memoized toggle function to prevent unnecessary re-renders
    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === "light" ? "dark" : "light")
    }, [])

    const value = {
        theme,
        toggleTheme
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}