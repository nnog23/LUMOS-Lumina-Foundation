import { Router } from 'express';
import Rnp from '../models/Rnp.js';

const rnpRouter = Router();

rnpRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

rnpRouter.get("/rnp", async (req, res) => {
    try {
        const collection = await Rnp.find({}).lean().exec();
        res.json(collection);

    } catch (err) {
        console.error(err);
        res.redirect('/admin/rnp');
    }
});


rnpRouter.post("/rnp", async (req, res) => {
    console.log("POST request received for /rnp");
    try {
        const result = await Rnp.create({
            title: req.body.title, 
            body: req.body.body,
            dateTime: req.body.date,
            published: 0
        });

        console.log(result);
        res.redirect('/admin/rnp');

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default rnpRouter;