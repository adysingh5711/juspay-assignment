export type StatusType = "complete" | "pending" | "inProgress" | "approved" | "rejected"

export interface OrderListTableType {
    id: string;
    avatar: string;
    username: string;
    projectName: string;
    address: string;
    date: string;
    status: StatusType;
}