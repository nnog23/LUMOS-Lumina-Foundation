import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Ensure this environment variable is set
let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your MongoDB URI to the environment variables');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to prevent multiple instances
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new MongoClient instance
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;