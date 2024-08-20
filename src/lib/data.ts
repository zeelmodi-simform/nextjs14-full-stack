import { User } from "@/models/user.model";
import { connectToDB } from "./dbConnection";


export const fetchUsers = async () => {
    try {
        await connectToDB()
        const users = await User.find({});        
        return users;
    } catch (error) {
        console.log({error});
        throw new Error('Failed to fetch users!')
    }
}