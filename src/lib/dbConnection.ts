import bcrypt from 'bcrypt';
import mongoose, { ConnectionStates } from "mongoose";

import { Product } from "@/models/product.model";
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
  }];

const seedProducts = [
  {
    title: "Basic T-Shirt",
    description: "A simple, classic T-shirt for everyday wear.",
    price: 19.99,
    img: "tshirt-basic.jpg",
    color: "White",
    size: "M",
    stock: 100
  },
  {
    title: "Premium Hoodie",
    description: "A cozy, high-quality hoodie for colder days.",
    price: 49.99,
    img: "hoodie-premium.jpg",
    color: "Black",
    size: "L",
    stock: 50
  },
  {
    title: "Denim Jeans",
    description: "Stylish and comfortable denim jeans.",
    price: 59.99,
    img: "jeans-denim.jpg",
    color: "Blue",
    size: "32",
    stock: 75
  },
  {
    title: "Running Shoes",
    description: "Lightweight running shoes with excellent grip.",
    price: 89.99,
    img: "shoes-running.jpg",
    color: "Gray",
    size: "10",
    stock: 30
  },
  {
    title: "Leather Wallet",
    description: "A durable and stylish leather wallet.",
    price: 29.99,
    img: "wallet-leather.jpg",
    color: "Brown",
    size: "One Size",
    stock: 150
  },
  {
    title: "Sports Jacket",
    description: "A waterproof sports jacket for outdoor activities.",
    price: 79.99,
    img: "jacket-sports.jpg",
    color: "Navy",
    size: "L",
    stock: 45
  },
  {
    title: "Classic Watch",
    description: "A timeless wristwatch with leather straps.",
    price: 199.99,
    img: "watch-classic.jpg",
    color: "Black",
    size: "One Size",
    stock: 20
  },
  {
    title: "Summer Dress",
    description: "A light and breezy dress perfect for summer.",
    price: 39.99,
    img: "dress-summer.jpg",
    color: "Yellow",
    size: "S",
    stock: 80
  },
  {
    title: "Sunglasses",
    description: "Stylish sunglasses with UV protection.",
    price: 24.99,
    img: "sunglasses.jpg",
    color: "Black",
    size: "One Size",
    stock: 200
  },
  {
    title: "Wool Scarf",
    description: "A warm wool scarf for cold weather.",
    price: 34.99,
    img: "scarf-wool.jpg",
    color: "Gray",
    size: "One Size",
    stock: 60
  },
  {
    title: "Casual Sneakers",
    description: "Comfortable sneakers for everyday use.",
    price: 54.99,
    img: "sneakers-casual.jpg",
    color: "White",
    size: "9",
    stock: 90
  },
  {
    title: "Backpack",
    description: "A durable backpack with multiple compartments.",
    price: 69.99,
    img: "backpack.jpg",
    color: "Black",
    size: "Medium",
    stock: 40
  },
  {
    title: "Baseball Cap",
    description: "A classic baseball cap with adjustable strap.",
    price: 15.99,
    img: "cap-baseball.jpg",
    color: "Red",
    size: "One Size",
    stock: 110
  },
  {
    title: "Leather Belt",
    description: "A high-quality leather belt with a metal buckle.",
    price: 25.99,
    img: "belt-leather.jpg",
    color: "Brown",
    size: "M",
    stock: 70
  },
  {
    title: "Winter Gloves",
    description: "Warm gloves made from wool and fleece.",
    price: 19.99,
    img: "gloves-winter.jpg",
    color: "Black",
    size: "L",
    stock: 55
  },
  {
    title: "Laptop Sleeve",
    description: "A protective sleeve for laptops up to 15 inches.",
    price: 29.99,
    img: "laptop-sleeve.jpg",
    color: "Gray",
    size: "15 inches",
    stock: 95
  },
  {
    title: "Graphic T-Shirt",
    description: "A T-shirt with a trendy graphic print.",
    price: 22.99,
    img: "tshirt-graphic.jpg",
    color: "Black",
    size: "M",
    stock: 120
  },
  {
    title: "Fitness Tracker",
    description: "A smartwatch with fitness tracking capabilities.",
    price: 149.99,
    img: "fitness-tracker.jpg",
    color: "Blue",
    size: "One Size",
    stock: 25
  },
  {
    title: "Casual Shorts",
    description: "Comfortable shorts for casual wear.",
    price: 29.99,
    img: "shorts-casual.jpg",
    color: "Khaki",
    size: "M",
    stock: 85
  },
  {
    title: "Cotton Socks",
    description: "Soft and breathable cotton socks.",
    price: 9.99,
    img: "socks-cotton.jpg",
    color: "White",
    size: "L",
    stock: 200
  }
];

const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();
    if (userCount === 0) {
      await User.insertMany(seedUsers.map((user) => {
        return {
          ...user,
          password: bcrypt.hashSync(user.password, 10),
        };
      }));

      
            
      console.log("Database seeded successfully.");
    } else {
      console.log("Database already seeded. No seeding performed.");
    }

    if(productsCount === 0){
      await Product.insertMany(seedProducts)
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