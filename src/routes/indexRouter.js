import { Router } from 'express';
import path from 'path';
import newsRouter from './newsRouter.js';
import eventsRouter from './eventsRouter.js';
import rnpRouter from './rnpRouter.js';
// import userRouter from './usersRouter.js';
// import postsRouter from './postsRouter.js';

/**
 * This module is the `main` router. All subrouters should be added into this.
 * The program entry point (~/index.js) uses this router.
 */
const router = Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

router.get("/home", (req, res) => {
    res.redirect("/");
}); 

router.get("/homepage", (req, res) => {
    res.redirect("/");
});

router.use(newsRouter);
router.use(eventsRouter);
router.use(rnpRouter);


export default router;
// In CommonJS, `export default userRouter` is equivalent to:
// module.exports = userRouter;