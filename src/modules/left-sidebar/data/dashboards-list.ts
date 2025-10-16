import { ChartPieSlice, ShoppingBagOpen, Folder, BookOpen, ShoppingCartSimple } from "phosphor-react"
import { ListType } from "../types/list-type"

export const DashboardsList: ListType[] = [
    {
        id: "default",
        name: "Default",
        icon: ChartPieSlice,
    },
    {
        id: "order-list",
        name: "Order List",
        icon: ShoppingCartSimple,
    },
    {
        id: "ecommerce",
        name: "eCommerce",
        icon: ShoppingBagOpen,
        subList: [
            {
                id: "amazon",
                name: "Amazon"
            },
            {
                id: "flipkart",
                name: "Flipkart"
            },
            {
                id: "ebay",
                name: "Ebay"
            }
        ]
    },
    {
        id: "projects",
        name: "Projects",
        icon: Folder,
        subList: [
            {
                id: "github",
                name: "Github"
            },

        ]
    },
    {
        id: "onlineCourses",
        name: "Online Courses",
        icon: BookOpen,
        subList: [
            {
                id: "Coursera",
                name: "Coursera"
            },
            {
                id: "Udemy",
                name: "Udemy"
            },

        ]
    }
]