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
    address?: string;
    v?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IProduct {
    _id: Types.ObjectId;
    title: string;
    description: string;
    price: number;
    color?: string;
    img: string;
    size: string;
    stock: number;
    v?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export type CreateUserType = Omit<IUser, '_id' | 'v' | 'createdAt' | 'updatedAt' | 'img'>;

export type CreateProductType = Omit<IProduct, '_id' | 'v' | 'createdAt' | 'updatedAt'>;