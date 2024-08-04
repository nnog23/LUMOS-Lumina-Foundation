import { Router } from 'express';
import Events from '../models/Events.js';

const eventsRouter = Router();

eventsRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

eventsRouter.get("/events", async (req, res) => {
    try {
        const collection = await Events.find({}).lean().exec();
        res.json(collection);

    } catch (err) {
        console.error(err);
        res.redirect('/admin/events');
    }
});


eventsRouter.post("/events", async (req, res) => {
    console.log("POST request received for /events");
    try {
        const result = await Events.create({
            title: req.body.title, 
            body: req.body.body,
            dateTime: req.body.date,
            published: 0
        });

        console.log(result);
        res.redirect('/admin/events');
        
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default eventsRouter;