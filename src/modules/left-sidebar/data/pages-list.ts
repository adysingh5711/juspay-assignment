import { ListType } from "../types/list-type";
import { IdentificationBadge, IdentificationCard, Notebook, UsersThree, ChatsTeardrop } from "phosphor-react";

export const PagesList: ListType[] = [
    {
        id: "user-profile",
        name: "User Profile",
        icon: IdentificationBadge,
        subList: [
            {
                id: "user-overview",
                name: "Overview"
            },
            {
                id: "user-projects",
                name: "Projects"
            },
            {
                id: "user-campaigns",
                name: "Campaigns"
            },
            {
                id: "user-documents",
                name: "Documents"
            },
            {
                id: "user-followers",
                name: "Followers"
            },

        ]
    },
    {
        id: "account",
        name: "Account",
        icon: IdentificationCard,
        subList: [
            {
                id: "account-details",
                name: "Account Details"
            },
            {
                id: "account-settings",
                name: "Account Settings"
            },
            {
                id: "account-history",
                name: "Account History"
            },
        ]
    },
    {
        id: "corporate",
        name: "Corporate",
        icon: UsersThree,
        subList: [
            {
                id: "product-team",
                name: "Product Team"
            },
            {
                id: "design-team",
                name: "Design Team"
            },
            {
                id: "engineering-team",
                name: "Engineering Team"
            },
        ]
    },
    {
        id: "blog",
        name: "Blog",
        icon: Notebook,
        subList: [
            {
                id: "blog-posts",
                name: "Blog Posts"
            },
            {
                id: "blog-categories",
                name: "Blog Categories"
            },
        ]
    },
    {
        id: "social",
        name: "Social",
        icon: ChatsTeardrop,
        subList: [
            {
                id: "twitter",
                name: "Twitter"
            },
            {
                id: "linkedin",
                name: "LinkedIn"
            },
            {
                id: "instagram",
                name: "Instagram"
            },
        ]
    },
]