import { IconProps } from "phosphor-react";

export interface NotificationType {
    id: string;
    title: string;
    icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
    time: string;
    type: "bug" | "user" | "subscribe";
}