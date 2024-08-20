import { User } from "@/models/user.model";
import { connectToDB } from "./dbConnection";


export const fetchUsers = async (searchTerm: string) => {
    try {
        await connectToDB()

        const regex = new RegExp(searchTerm, 'i');

        const users = await User.find({username: {$regex: regex}});        
        return users;
    } catch (error) {
        console.log({error});
        throw new Error('Failed to fetch users!')
    }
}