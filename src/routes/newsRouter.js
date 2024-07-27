import { Router } from 'express';
import News from '../models/News.js';

const newsRouter = Router();

newsRouter.get("/news", async (req, res) => {
    try {
        const newsArray = await News.find({}).lean().exec();
        res.render("news", {
            title: "News",
            news: newsArray
        });
    } catch (err) {
        console.error(err);
        res.render("news", {
            title: "News"
        });
    }
});

newsRouter.post("/news", async (req, res) => {
    console.log("POST request received for /news");
    try {
        const result = await News.create({
            title: req.body.title, 
            body: req.body.body,
            dateTime: req.body.dateTime
        });

        console.log(result);
        res.sendStatus(200);
    // or you can write
    // news.insertOne(req.body);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default newsRouter;