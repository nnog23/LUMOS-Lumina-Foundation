import { Router } from 'express';
import path from 'path';
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

router.get("/random", (req, res) => {
    res.redirect("/");
}); 

router.get("/homepage", (req, res) => {
    res.redirect("/");
});

// router.use(userRouter);
// router.use(postsRouter);

router.use((req, res) => {
    res.render("error", {
        title: "Page not Found."
    });
});

export default router;
// In CommonJS, `export default userRouter` is equivalent to:
// module.exports = userRouter;