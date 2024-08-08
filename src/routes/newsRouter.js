import { Router } from 'express';
import News from '../models/News.js';
import { isAuthenticated } from './indexRouter.js';
import upload from '../../upload.js'

const newsRouter = Router();

newsRouter.get("/news", async (req, res) => {
    try {
        const collection = await News.find({}).lean().exec();
        res.json(collection);

    } catch (err) {
        console.error(err);
        res.redirect('/admin/news');
    }
});

newsRouter.post("/news", isAuthenticated, upload.single('image'), async (req, res) => {

    console.log("POST request received for /news");

    const file = req.file;

    if(!file){

        console.log("NO FILE")
        return res.status(400).send('No file uploaded.');

    }

    try {
    
        const imageUrl = file.path;
        
        const result = await News.create({
            title: req.body.title, 
            body: req.body.body,
            dateTime: req.body.date,
            published: 0,
            imageurl: imageUrl
        });
        
        console.log(result);
        res.redirect('/admin/news');
        
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

newsRouter.get('/admin/forms/edit/editNews/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        const newsItem = await News.findById(id);
        if (newsItem) {
            console.log(newsItem)
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

newsRouter.put('/news/:id', isAuthenticated,  upload.single('image'), async (req, res) => {
    
    const { id } = req.params;
    const { title, body, date } = req.body;
    const dateTime = date;
    const file = req.file;

    try {

        let imageUrl = null;

        if (file) {
            
            imageUrl = file.path; // This is Cloudinary's URL for the uploaded image
            const imageurl = imageUrl
            const updatedNewsItem = await News.findByIdAndUpdate(
                id,
                { title, body, dateTime, imageurl},
                { new: true } // Return the updated document
            );
            
            if (updatedNewsItem) {
                res.redirect('/')
            } else {
                res.status(404).send('News item not found');
            }

        } else {

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

        }
    

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

newsRouter.delete('/deletenews/:id', isAuthenticated, async (req, res) => {
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

newsRouter.put('/publishnews/:id', isAuthenticated, async (req, res) => {
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

newsRouter.put('/unpublishnews/:id', isAuthenticated, async (req, res) => {
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