import { Product } from "@/models/product.model";
import { User } from "@/models/user.model";
import { connectToDB } from "./dbConnection";

(async () => {
    await connectToDB()
})()

export const fetchUsers = async (searchTerm: string, page: number, limit: number ) => {
    try {

        const regex = new RegExp(searchTerm, 'i');
        const query = {username: {$regex: regex}};
        const totalCount = await User.countDocuments(query);
        const users = await User.find(query).sort({updatedAt: -1}).limit(limit).skip(limit * (page - 1));        
        return { users, totalCount };
    } catch (error) {
        console.log({error});
        throw new Error('Failed to fetch users!')
    }
}

export const fetchUser = async (id: string) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch user!')
    }
}

export const fetchProducts = async (searchTerm: string, page: number, limit: number) => {
    try {
        const regex = new RegExp(searchTerm, 'i');
        const query = { title: { $regex: regex } };
        const totalCount = await Product.countDocuments(query);
        const products = await Product.find(query).limit(limit).skip(limit * (page - 1));
        return { products, totalCount };
    } catch (error) {
        console.log({ error });
        throw new Error('Failed to fetch products!')
    }
};

export const fetchProduct = async (id: string) => {
    try {
        const product = await Product.findById(id);
        return product;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch product!')
    }
}