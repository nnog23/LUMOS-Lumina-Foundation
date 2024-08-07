import { Router } from 'express';
import path from 'path';
import newsRouter from './newsRouter.js';
import eventsRouter from './eventsRouter.js';
import rnpRouter from './rnpRouter.js';
import adminsRouter from './adminsRouter.js';
import { fileURLToPath } from 'url';

// Create a router instance
const router = Router();

// Define the path to the built files directory

// Route to serve the index page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Redirect /home and /homepage to the root path
router.get("/home", (req, res) => {
    res.redirect("/");
}); 

router.get("/homepage", (req, res) => {
    res.redirect("/");
});

// Use routers for specific functionalities
router.use(adminsRouter);
router.use(newsRouter);
router.use(eventsRouter);
router.use(rnpRouter);

// Middleware to check authentication
export function isAuthenticated(req, res, next) {
    // Check if the user has a valid session
    console.log('Session data:', req.session);
    console.log('isAuthenticated middleware triggered');

    if (req.session.adminId) {
        // If the user is authenticated, proceed to the next middleware or route handler
        console.log('has an adminId');
        return next();
    } else {
        // If the user is not authenticated, redirect to the login page
        console.log('NO adminId');
        // Redirect to the login page
    }
}

// Export the router
export default router;