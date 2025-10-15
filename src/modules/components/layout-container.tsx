import { LeftSidebarProvider } from "../contexts/left-sidebar-context"
import { RightSidebarProvider } from "../contexts/right-sidebar-context"
import { RightSidebarSectionsProvider } from "../contexts/right-sidebar-sections-context"
import { ThemeProvider, useTheme } from "../contexts/theme-context"
import { LeftSidebar } from "../left-sidebar/components/left-sidebar"
import { Main } from "../main/components/main"
import { Navbar } from "../navbar/components/navbar"
import { RightSidebar } from "../right-sidebar/components/right-sidebar"
import { Outlet } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

/**
 * Main Layout Component
 * 
 * This component orchestrates the entire dashboard layout with three main sections:
 * left sidebar, main content area, and right sidebar. I've implemented a context-based
 * architecture where each sidebar has its own context provider for state management.
 * 
 * Key design decisions:
 * - Context providers are nested to provide isolated state management
 * - Framer Motion animations enhance UX with smooth transitions
 * - Responsive design with Tailwind CSS classes
 * - Theme-aware styling with dynamic class application
 * - AnimatePresence for smooth route transitions
 */
const Layout = () => {
    const { theme } = useTheme()

    return (
        <LeftSidebarProvider>
            <RightSidebarProvider>
                <RightSidebarSectionsProvider>
                    <LeftSidebar />
                    <motion.div
                        className={`flex-1 h-screen overflow-hidden ${theme === 'dark' ? 'bg-black/90 text-white text-black/20' : 'bg-white text-black'} transition-all duration-500`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Navbar />
                        <motion.div
                            className="h-[92vh] overflow-y-auto p-4 sm:px-6 lg:p-7"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <Main>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={window.location.pathname}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Outlet />
                                    </motion.div>
                                </AnimatePresence>
                            </Main>
                        </motion.div>
                    </motion.div>
                    <RightSidebar />
                </RightSidebarSectionsProvider>
            </RightSidebarProvider>
        </LeftSidebarProvider>
    )
}

/**
 * Layout Container Component
 * 
 * This is the root layout wrapper that provides the theme context to all child components.
 * I've separated this from the main Layout component to ensure proper context hierarchy
 * and to add a smooth initial page load animation.
 */
export const LayoutContainer = () => {
    return (
        <motion.div
            className="flex min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <ThemeProvider>
                <Layout />
            </ThemeProvider>
        </motion.div>
    )
}
