import { Types } from "mongoose";
import { ReactElement } from "react";

export interface ISideBarItem {
    title: string;
    icon: ReactElement;
    path: string;
    badge?: number;
    children?: ISideBarItem[];
}

export interface IUser {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    img: string;
    isAdmin: boolean;
    isActive: boolean;
    phone: string;
    v?: number;
    createdAt?: Date;
    updatedAt?: Date;
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