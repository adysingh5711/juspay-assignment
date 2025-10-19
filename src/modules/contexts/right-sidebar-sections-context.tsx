import { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Right Sidebar Sections Context
 * 
 * This context manages the dynamic reordering of sections in the right sidebar.
 * I've implemented this to allow users to prioritize different sections (notifications
 * or activities) based on their current needs, enhancing the user experience.
 * 
 * Key features:
 * - Dynamic section reordering with smooth animations
 * - Animation key tracking for Framer Motion transitions
 * - Independent functions for setting section priority
 * - Type-safe section management
 * 
 * Design rationale:
 * - Separating this from the main sidebar context follows the single responsibility principle
 * - Animation key ensures proper re-animation when sections reorder
 * - Provides granular control over sidebar content organization
 */

type SectionType = 'notifications' | 'activities';

interface RightSidebarSectionsContextType {
    sectionOrder: SectionType[];
    animationKey: number;
    setNotificationsFirst: () => void;
    setActivitiesFirst: () => void;
}

const RightSidebarSectionsContext = createContext<RightSidebarSectionsContextType | undefined>(undefined);

export const useRightSidebarSections = () => {
    const context = useContext(RightSidebarSectionsContext);
    if (!context) {
        throw new Error('useRightSidebarSections must be used within a RightSidebarSectionsProvider');
    }
    return context;
};

interface RightSidebarSectionsProviderProps {
    children: ReactNode;
}

export const RightSidebarSectionsProvider = ({ children }: RightSidebarSectionsProviderProps) => {
    const [sectionOrder, setSectionOrder] = useState<SectionType[]>(['notifications', 'activities']);
    const [animationKey, setAnimationKey] = useState(0);

    const setNotificationsFirst = () => {
        setSectionOrder(['notifications', 'activities']);
        setAnimationKey(prev => prev + 1);
    };

    const setActivitiesFirst = () => {
        setSectionOrder(['activities', 'notifications']);
        setAnimationKey(prev => prev + 1);
    };

    return (
        <RightSidebarSectionsContext.Provider value={{
            sectionOrder,
            animationKey,
            setNotificationsFirst,
            setActivitiesFirst
        }}>
            {children}
        </RightSidebarSectionsContext.Provider>
    );
}; 