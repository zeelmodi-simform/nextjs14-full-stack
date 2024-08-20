import mongoose, { ConnectionStates } from "mongoose";

import { User } from "@/models/user.model";

const connection: { isConnected?: ConnectionStates } = {};

const seedUsers = [{
    username: "John Doe",
    email: "john@example.com",
    isAdmin: true,
    isActive: true,
    img: "https://example.com/image1.jpg",
    password: "Test@123",
    address: "123 Main St, Springfield, IL",
    phone: "+1-555-1234",
  },
  {
    username: "Jane Smith",
    email: "jane@example.com",
    isAdmin: false,
    isActive: true,
    img: "https://example.com/image2.jpg",
    password: "Test@123",
    address: "456 Elm St, Springfield, IL",
    phone: "+1-555-5678",
  },
  {
    username: "Bob Johnson",
    email: "bob@example.com",
    isAdmin: false,
    isActive: true,
    img: "https://example.com/image3.jpg",
    password: "Test@123",
    address: "789 Maple St, Springfield, IL",
    phone: "+1-555-9101",
  },
  {
    username: "Alice Williams",
    email: "alice@example.com",
    isAdmin: false,
    isActive: false,
    img: "https://example.com/image4.jpg",
    password: "Test@123",
    address: "321 Oak St, Springfield, IL",
    phone: "+1-555-1123",
  },
  {
    username: "Tom Davis",
    email: "tom@example.com",
    isAdmin: true,
    isActive: true,
    img: "https://example.com/image5.jpg",
    password: "Test@123",
    address: "654 Pine St, Springfield, IL",
    phone: "+1-555-4567",
  },
  {
    username: "Sarah Lee",
    email: "sarah@example.com",
    isAdmin: false,
    isActive: true,
    img: "https://example.com/image6.jpg",
    password: "Test@123",
    address: "987 Birch St, Springfield, IL",
    phone: "+1-555-8910",
  },
  {
    username: "Michael Brown",
    email: "michael@example.com",
    isAdmin: false,
    isActive: true,
    img: "https://example.com/image7.jpg",
    password: "Test@123",
    address: "123 Cedar St, Springfield, IL",
    phone: "+1-555-2345",
  },
  {
    username: "Emily Wilson",
    email: "emily@example.com",
    isAdmin: true,
    isActive: true,
    img: "https://example.com/image8.jpg",
    password: "Test@123",
    address: "456 Willow St, Springfield, IL",
    phone: "+1-555-6789",
  },
  {
    username: "David Taylor",
    email: "david@example.com",
    isAdmin: false,
    isActive: true,
    img: "https://example.com/image9.jpg",
    password: "Test@123",
    address: "789 Chestnut St, Springfield, IL",
    phone: "+1-555-1011",
  },
  {
    username: "Olivia Anderson",
    email: "olivia@example.com",
    isAdmin: false,
    isActive: true,
    img: "https://example.com/image10.jpg",
    password: "Test@123",
    address: "321 Sycamore St, Springfield, IL",
    phone: "+1-555-1213",
  },
  {
    username: "Christopher Martinez",
    email: "christopher@example.com",
    isAdmin: true,
    isActive: false,
    img: "https://example.com/image11.jpg",
    password: "Test@123",
    address: "654 Redwood St, Springfield, IL",
    phone: "+1-555-4568",
  },]

const seedDatabase = async () => {
    try {
        const userCount = await User.countDocuments();
        if (userCount === 0) {
            await User.insertMany(seedUsers);
            
            console.log("Database seeded successfully.");
        } else {
            console.log("Database already seeded. No seeding performed.");
        }
    } catch (error) {
        console.log({ error });
           
    }
};

export const connectToDB = async () => {


    try {
        if (connection.isConnected) {
            return
        };

        const db = await mongoose.connect(`${process.env.DB_CONNECTION_URL}`, {
            dbName: process.env.DB_NAME,
        });
        connection.isConnected = db.connections[0].readyState;

        await seedDatabase()
    } catch (error: any) {
        console.log({error});
        
        throw new Error(error)
    }
}