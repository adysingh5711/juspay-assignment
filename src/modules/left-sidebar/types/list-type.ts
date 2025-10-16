import { IconProps } from "phosphor-react"

/**
 * List Type Interface
 * 
 * This interface defines the structure for sidebar navigation items. I've designed
 * this to be flexible enough to handle both simple menu items and complex nested
 * structures with collapsible sub-menus.
 * 
 * Key design decisions:
 * - Used Phosphor React icons for consistent iconography across the app
 * - Made subList optional to support both simple and complex menu structures
 * - Used string IDs for better performance in React key props
 * - ForwardRefExoticComponent type ensures proper icon component typing
 */
export interface ListType {
    id: string,
    name: string,
    icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>,
    // If subList is present, it allows for rendering nested menu items or expandable/collapsible lists in the sidebar.
    subList?: { id: string, name: string }[]
}
