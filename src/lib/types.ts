import { ReactElement } from "react";

export interface ISideBarItem {
    title: string;
    icon: ReactElement;
    path: string;
    badge?: number;
    children?: ISideBarItem[];
}

export interface IUser {
    id: number | string;
    name: string;
    email: string;
    createdAt: string;
    status: string;
    role: string;
}

export interface IProduct {
    id: number | string;
    name: string;
    price: number;
    description: string;
    stock: number;
    createdAt: string;
    images?: string[];
}