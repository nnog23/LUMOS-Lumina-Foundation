import mongoose from 'mongoose';
import News from '../models/News.js'; // Adjust path as necessary

const mongoURI = process.env.MONGODB_URI;

let isConnected = false;

export async function connectToMongo(dbName = process.env.DB_NAME) {
  if (!isConnected) {
    await mongoose.connect(mongoURI, { dbName: dbName });
    isConnected = true;
    console.log('Connected to MongoDB.');
  }
}

export async function get(req, res) {
    try {
        await connectToMongo();
        const newsArray = await News.find({}).lean().exec();
        res.json(newsArray);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
}
