import mongoose, { ConnectionStates } from "mongoose";

export const connectToDB = async () => {

    const connection: { isConnected?: ConnectionStates } = {  };

    try {
        if (connection.isConnected) return;

        const db = await mongoose.connect(`${process.env.DB_CONNECTION_URL}`, {
            dbName: process.env.DB_NAME,
        });
        connection.isConnected = db.connections[0].readyState;
    } catch (error: any) {
        console.log({error});
        
        throw new Error(error)
    }
}