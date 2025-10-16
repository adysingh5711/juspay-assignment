import { useEffect, useState } from "react";
import { useRightSidebar } from "../../../../contexts/right-sidebar-context";
import { OverallDetailsData } from "../data/overall-details-data"
import { DetailCard } from "./detail-card"
import { useLeftSidebar } from "../../../../contexts/left-sidebar-context"


export const OverallDetails = () => {
    const {isLeftSidebarOpen} = useLeftSidebar();
    const {isRightSidebarOpen} = useRightSidebar();
    const [bothSidebarsOpen, setBothSidebarsOpen] = useState(true)

    useEffect(() => {
        if(isLeftSidebarOpen && isRightSidebarOpen){
            setBothSidebarsOpen(true)
        }else{
            setBothSidebarsOpen(false)
        }
    }, [isLeftSidebarOpen, isRightSidebarOpen])
    return(
        <div className={`grid grid-cols-1 lg:grid-cols-2 ${bothSidebarsOpen? "sm:grid-cols-1":"sm:grid-cols-2"} gap-4 sm:gap-7`}>
            {OverallDetailsData?.map((detail) => (
                <DetailCard
                    key={detail.id}
                    detail={detail}
                />
            ))}
        </div>
    )
}