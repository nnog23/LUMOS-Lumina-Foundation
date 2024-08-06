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


newsRouter.get('/admin/forms/edit/editNews/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const newsItem = await News.findById(id);
        if (newsItem) {
            newsItem.body = newsItem.body.trim();
            res.render('editNews', {initialData : newsItem})

        } else {
            res.status(404).send('News item not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

newsRouter.put('/news/:id', async (req, res) => {
    
    const { id } = req.params;
    const { title, body, date } = req.body;
    const dateTime = date;

    try {
        const updatedNewsItem = await News.findByIdAndUpdate(
            id,
            { title, body, dateTime},
            { new: true } // Return the updated document
        );
        
        if (updatedNewsItem) {
            res.redirect('/')
        } else {
            res.status(404).send('News item not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

newsRouter.delete('/deletenews/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await News.findByIdAndDelete(id);
        
        if (result) {
            res.status(200).send('News item deleted successfully');
        } else {
            res.status(404).send('News item not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

newsRouter.put('/publishnews/:id', async (req, res) => {
    const { id } = req.params;
    const published = 1;
    try {
        const updatedNewsItem = await News.findByIdAndUpdate(
            id,
            { published},
            { new: true } // Return the updated document
        );
        
        if (updatedNewsItem) {
            res.redirect('/')
        } else {
            res.status(404).send('News item not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

newsRouter.put('/unpublishnews/:id', async (req, res) => {
    const { id } = req.params;
    const published = 0;
    try {
        const updatedNewsItem = await News.findByIdAndUpdate(
            id,
            { published},
            { new: true } // Return the updated document
        );
        
        if (updatedNewsItem) {
            res.redirect('/')
        } else {
            res.status(404).send('News item not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

export default newsRouter;