import { Router } from 'express';
import Events from '../models/Events.js';
import { isAuthenticated } from './indexRouter.js';
import upload from '../../upload.js'

const eventsRouter = Router();

eventsRouter.get("/events",  async (req, res) => {
    try {
        const collection = await Events.find({}).lean().exec();
        res.json(collection);

    } catch (err) {
        console.error(err);
        res.redirect('/admin/events');
    }
});


eventsRouter.post("/events", isAuthenticated, upload.single('image'), async (req, res) => {

    console.log("POST request received for /events");

    const file = req.file;

    if(!file){

        console.log("NO FILE")
        return res.status(400).send('No file uploaded.');

    }

    try {
    
        const imageUrl = file.path;

        const result = await Events.create({
            title: req.body.title, 
            body: req.body.body,
            dateTime: req.body.date,
            published: 0,
            imageurl: imageUrl
        });
        
        console.log(result);
        res.redirect('/admin/events');
        
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


eventsRouter.get('/admin/forms/edit/editEvents/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        const eventsItem = await Events.findById(id);
        if (eventsItem) {
            
            res.render('editEvents', {initialData : eventsItem})

        } else {
            res.status(404).send('Events item not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

eventsRouter.put('/events/:id', isAuthenticated,  upload.single('image'), async (req, res) => {
    
    const { id } = req.params;
    const { title, body, date } = req.body;
    const dateTime = date;
    const file = req.file;

    try {

        let imageUrl = null;

        if (file) {
            
            imageUrl = file.path; // This is Cloudinary's URL for the uploaded image
            const imageurl = imageUrl
            const updatedEventsItem = await Events.findByIdAndUpdate(
                id,
                { title, body, dateTime, imageurl},
                { new: true } // Return the updated document
            );
            
            if (updatedEventsItem) {
                res.redirect('/')
            } else {
                res.status(404).send('Events item not found');
            }

        } else {

            const updatedEventsItem = await Events.findByIdAndUpdate(
                id,
                { title, body, dateTime},
                { new: true } // Return the updated document
            );

            if (updatedEventsItem) {
                res.redirect('/')
            } else {
                res.status(404).send('Events item not found');
            }
            
        }
    

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

eventsRouter.delete('/deleteevents/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Events.findByIdAndDelete(id);
        
        if (result) {
            res.status(200).send('Events item deleted successfully');
        } else {
            res.status(404).send('Events item not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

eventsRouter.put('/publishevents/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const published = 1;
    try {
        const updatedEventsItem = await Events.findByIdAndUpdate(
            id,
            { published},
            { new: true } // Return the updated document
        );
        
        if (updatedEventsItem) {
            res.redirect('/')
        } else {
            res.status(404).send('Events item not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

eventsRouter.put('/unpublishevents/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const published = 0;
    try {
        const updatedEventsItem = await Events.findByIdAndUpdate(
            id,
            { published},
            { new: true } // Return the updated document
        );
        
        if (updatedEventsItem) {
            res.redirect('/')
        } else {
            res.status(404).send('Events item not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

export default eventsRouter;