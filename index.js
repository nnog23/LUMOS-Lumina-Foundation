// System-related packages
import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from 'url';
import path from 'path';
// Web-app related packages
import express from "express";
// Routes modules
import router from "./src/routes/indexRouter.js";
// Database modules
import { connectToMongo } from "./src/lib/conn.js";

async function main () {
    const app = express();
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    
    // Serve static files from the 'dist' directory
    app.use(express.static(path.join(__dirname, 'dist')));
    app.use('/static', express.static('public/static'));
    // Serve index.html for the root path
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
    
    app.use(express.json());

    app.use(router);

    try {
        // Connect to MongoDB
        await connectToMongo();
        console.log ('Connected to MongoDB.');
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


