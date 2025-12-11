import type { ReactNode } from "react";


export type NotifyItemTypes = "success" | "error" | "info";
export interface NotifyItem {
    id: string;
    type: NotifyItemTypes;
    message: string;
    header?: string;
    timeout?: number;
}

export interface DialogAction {
    text: string;
    isResolve: boolean;
    action?: () => void;
}

export interface DialogItem {
    message: string;
    header?: string;
    actions: DialogAction[];
    resolve: (value: boolean) => void;
}

export interface NotificationProviderContextType {
    pushNotify: (item: Omit<NotifyItem, "id">) => void;
    pushDialog: (item: Omit<DialogItem, "resolve">) => Promise<boolean>;
}

export interface NotificationProviderProps {
    children: ReactNode;
}
