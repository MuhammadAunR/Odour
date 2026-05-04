import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
    throw new Error('Please define MONGO_URI in .eve.local')
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {
    if (cached.conn) return cached.conn
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose)
    }
    cached.conn = await cached.promise
    console.log('DB connected')
    console.log(mongoose.connection.name);
    return cached.conn
}

