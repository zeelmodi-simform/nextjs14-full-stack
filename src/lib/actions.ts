'use server'

import { User } from "@/models/user.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateProductType, CreateUserType, UpdateProductType, UpdateUserType } from "./types";

import { signIn } from "@/auth";
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

export const updateUser = async (formData: FormData) => {
    const { _id, username, email, phone, address, isAdmin, isActive }: UpdateUserType = Object.fromEntries(formData) as unknown as UpdateUserType;

    try {
        const updateFields: Partial<UpdateUserType> = {
            username,
            email,
            phone,
            address,
            isAdmin,
            isActive
        };

        (Object.keys(updateFields) as (keyof UpdateUserType)[]).forEach((key) => {
            if (updateFields[key] === '' || updateFields[key] === undefined) {
                delete updateFields[key];
            }
        });

        await User.findByIdAndUpdate(_id, updateFields, {
            new: true,
            runValidators: true
        })
    } catch (error) {
        console.log(error);
        throw new Error('Failed to update user!')
    }

    revalidatePath('/dashboard/users')
    redirect('/dashboard/users')
}

export const deleteUser = async (formData: FormData) => {
    const { id } = Object.fromEntries(formData);

    try {
        await User.findByIdAndDelete(id)
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete user!')
    }

    revalidatePath('/dashboard/users')
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

export const updateProduct = async (formData: FormData) => {
    const { _id, title, price, description, stock, color, size }: UpdateProductType = Object.fromEntries(formData) as unknown as UpdateProductType;

    try {
        const updateFields: Partial<UpdateProductType> = {
            title,
            price,
            description,
            stock,
            color,
            size
        };

        (Object.keys(updateFields) as (keyof UpdateProductType)[]).forEach((key) => {
            if (updateFields[key] === '' || updateFields[key] === undefined) {
                delete updateFields[key];
            }
        });

        await Product.findByIdAndUpdate(_id, updateFields, {
            new: true,
            runValidators: true
        })
    } catch (error) {
        console.log(error);
        throw new Error('Failed to update product!')
    }

    revalidatePath('/dashboard/products')
    redirect('/dashboard/products')
}

export const authenticate = async (formData: FormData) => {
    const { email, password } = Object.fromEntries(formData) as { email: string, password: string };

    try {
        await signIn('credentials', { username: email, password });
    } catch (error) {
        console.log(error);
        // throw new Error('Failed to authenticate user!');
        return {error: 'Wrong Credentials!'}
    }
};