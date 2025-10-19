/**
 * Main Content Wrapper Component
 * 
 * This is a simple wrapper component that provides consistent spacing for main
 * content area. I've kept this minimal to maintain flexibility while ensuring
 * consistent vertical rhythm throughout the application.
 * 
 * Design decisions:
 * - Flexbox column layout for vertical stacking
 * - Consistent 28px (gap-7) spacing between sections
 * - No horizontal constraints to allow responsive child components
 * 
 * @param children - React nodes to be rendered within the main content area
 */
export const Main = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col gap-7">
            {children}
        </div>
    )
}