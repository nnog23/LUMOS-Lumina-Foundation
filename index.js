// System-related packages
import "dotenv/config";
import { fileURLToPath } from "url";
import path from "path";
// Web-app related packages
import express from "express";
import session from "express-session";
// Routes modules
import router from "./src/routes/indexRouter.js";
// Database modules
import { connectToMongo } from "./src/lib/conn.js";
// Session Management
import MongoDBStore from "connect-mongodb-session";

const MongoDBStoreInstance = MongoDBStore(session);


async function main() {
  const app = express();
  const __dirname = path.dirname(fileURLToPath(import.meta.url)); 

  const store = new MongoDBStoreInstance({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
  });
  
  store.on('error', (error) => {
    console.log(error);
  });

  app.use(session({
    secret: 'A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6', // Change this to a secure key
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  }));

  // Serve static files from the 'dist' directory
  app.use(express.static(path.join(__dirname, "dist")));
  app.use(express.static(__dirname + "/public"));

  app.use("/static", express.static("public/static"));
  // Serve index.html for the root path
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

  app.set("view engine", "ejs");

  // WARNING: UNCOMMENT THIS OUT IF EVER 
  // WARNING: UNCOMMENT THIS OUT IF EVER 
  // WARNING: UNCOMMENT THIS OUT IF EVER 
  // WARNING: UNCOMMENT THIS OUT IF EVER 
  // WARNING: UNCOMMENT THIS OUT IF EVER 
  // WARNING: UNCOMMENT THIS OUT IF EVER 
  // WARNING: UNCOMMENT THIS OUT IF EVER 
  
  // app.use(express.json());

  app.use(router);

  try {
    // Connect to MongoDB
    await connectToMongo();
    // Start Express App
    app.listen(process.env.PORT || PORT, () => {
      console.log("Express app now listening...");
    });
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

main();
