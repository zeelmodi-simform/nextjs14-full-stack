'use server'


import { User } from "@/models/user.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateProductType, CreateUserType } from "./types";

import { Product } from "@/models/product.model";
import bcrypt from 'bcrypt';

export const addUser = async (formData: FormData) => {
    const { username, email, password, phone, address, isAdmin, isActive,  }: CreateUserType = Object.fromEntries(formData) as unknown as CreateUserType;
    
    try {

        // await connectToDB()

        const salt = bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, Number(salt))

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            phone,
            address,
            isAdmin,
            isActive
        })
        
        await newUser.save();
    } catch (error) {
        console.log(error);
        throw new Error('Failed to create user!')
    }

    revalidatePath('/dashboard/users')
    redirect('/dashboard/users')
}

export const addProduct = async (formData: FormData) => {
    const { title, price, description, stock, color, size }: CreateProductType = Object.fromEntries(formData) as unknown as CreateProductType;

    try {

        // await connectToDB()

        const newProduct = new Product({
            title,
            price,
            description,
            stock,
            color,
            size
        })

        await newProduct.save();
    } catch (error) {
        console.log(error);
        throw new Error('Failed to create product!')
    }

    revalidatePath('/dashboard/products')
    redirect('/dashboard/products')
}

export const deleteProduct = async (formData: FormData) => {
    const { id } = Object.fromEntries(formData);

    try {
        await Product.findByIdAndDelete(id)
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete product!')
    }

    revalidatePath('/dashboard/products')
}