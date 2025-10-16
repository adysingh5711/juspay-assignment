import { BugBeetle, Globe, User } from "phosphor-react";
import { NotificationType } from "../types/notification-type";

export const NotificationsData: NotificationType[] = [
    {
        id: 'bug1',
        title: 'You have a bug that needs to be fixed',
        icon: BugBeetle,
        time: 'Just Now',
        type: 'bug'
    },
    {
        id: 'user1',
        title: 'New user registered',
        icon: User,
        time: '59 minutes ago',
        type: 'user'
    },
    {
        id: 'bug2',
        title: 'You have a bug that needs to be fixed',
        icon: BugBeetle,
        time: '12 hours ago',
        type: 'bug'
    },
    {
        id: 'subscribe1',
        title: 'Andi Lane subscribed to you',
        icon: Globe,
        time: 'Today, 11:59 AM',
        type: 'subscribe'
    },
]