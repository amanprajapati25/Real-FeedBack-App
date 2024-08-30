import mongoose from "mongoose";

type connectionObject = {
    isConnected?: any
} 

const connection: connectionObject = {}

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log('Connection is Established')
        return
    }
    try {
        const mongoDB = await mongoose.connect(process.env.MONGODB_URI || '', {})
        connection.isConnected = mongoDB.connections[0].readyState;
        console.log('MongoDb connection sucessfull')

    } catch (error) {
        console.log('Mongo DB connection failed', error)
        process.exit(1);
    }
}

export default dbConnect;