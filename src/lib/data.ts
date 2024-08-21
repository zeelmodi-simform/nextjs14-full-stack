import { User } from "@/models/user.model";
import { connectToDB } from "./dbConnection";

const ITEM_PER_PAGE = 2;

export const fetchUsers = async (searchTerm: string, page: number, limit: number = ITEM_PER_PAGE ) => {
    try {
        await connectToDB()

        const regex = new RegExp(searchTerm, 'i');
        const query = {username: {$regex: regex}};
        const totalCount = await User.countDocuments(query);
        const users = await User.find(query).limit(limit).skip(limit * (page - 1));        
        return { users, totalCount };
    } catch (error) {
        console.log({error});
        throw new Error('Failed to fetch users!')
    }
}