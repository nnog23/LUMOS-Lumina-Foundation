import { Router } from 'express';
import News from '../models/News.js';

const newsRouter = Router();

newsRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

newsRouter.get("/news", async (req, res) => {
    try {
        const collection = await News.find({}).lean().exec();
        res.json(collection);

    } catch (err) {
        console.error(err);
        res.redirect('/admin/news');
    }
});


newsRouter.post("/news", async (req, res) => {
    console.log("POST request received for /news");
    try {
        const result = await News.create({
            title: req.body.title, 
            body: req.body.body,
            dateTime: req.body.date,
            published: 0
        });

        console.log(result);
        res.redirect('/admin/news');
        
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


newsRouter.post("/news", async (req, res) => {
    console.log("POST request received for /news");
    try {
        const result = await News.create({
            title: req.body.title, 
            body: req.body.body,
            dateTime: req.body.date,
            published: 0
        });

        console.log(result);
        res.redirect('/admin/news');
        
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


newsRouter.get('/admin/forms/edit/editNews/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const newsItem = await News.findById(id);
        if (newsItem) {
            
            res.render('editNews', {initialData : newsItem})

        } else {
            res.status(404).send('News item not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

export default newsRouter;