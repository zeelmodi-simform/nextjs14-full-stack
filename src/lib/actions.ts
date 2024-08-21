import { User } from "@/models/user.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateUserType } from "./types";

import bcrypt from 'bcrypt';

export const addUser = async (formData: FormData) => {
    'use server'
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