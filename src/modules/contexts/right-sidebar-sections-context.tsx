import { createContext, useContext, useState, ReactNode } from 'react';

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