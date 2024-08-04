import mongoose from 'mongoose';
import News from '../models/News.js';

const mongoURI = process.env.MONGODB_URI;

/*
export function connectToMongo(dbName = process.env.DB_NAME) {
  return mongoose.connect(mongoURI, { dbName: dbName });
};
*/

// new way of mongodb connection

let isConnected = false;

export async function connectToMongo(dbName = process.env.DB_NAME) {
  if (!isConnected) {
    await mongoose.connect(mongoURI, { dbName: dbName });
    isConnected = true;
    console.log('Connected to MongoDB.');
  }
}

function signalHandler() {
  console.log("Closing MongoDB connection...");
  mongoose.disconnect();
  process.exit();
}

export async function getNews() {
  try {
      await connectToMongo();
      const newsArray = await News.find({}).lean().exec();
      return newsArray;

  } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
  }
}

process.on("SIGINT", signalHandler);
process.on("SIGTERM", signalHandler);
process.on("SIGQUIT", signalHandler);

