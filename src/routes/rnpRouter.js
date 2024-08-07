import { Router } from 'express';
import Rnp from '../models/Rnp.js';
import { isAuthenticated } from './indexRouter.js';
import upload from '../../upload.js'

const rnpRouter = Router();

rnpRouter.get("/rnp", async (req, res) => {
    try {
        const collection = await Rnp.find({}).lean().exec();
        res.json(collection);

    } catch (err) {
        console.error(err);
        res.redirect('/admin/rnp');
    }
});


rnpRouter.post("/rnp", isAuthenticated, upload.single('image'), async (req, res) => {

    console.log("POST request received for /rnp");

    const file = req.file;

    if(!file){

        console.log("NO FILE")
        return res.status(400).send('No file uploaded.');

    }

    try {
    
        const imageUrl = file.path;

        const result = await Rnp.create({
            title: req.body.title, 
            body: req.body.body,
            dateTime: req.body.date,
            published: 0,
            imageurl: imageUrl
        });
        
        console.log(result);
        res.redirect('/admin/rnp');
        
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

rnpRouter.get('/admin/forms/edit/editRnp/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        const rnpItem = await Rnp.findById(id);
        if (rnpItem) {
            
            res.render('editRnp', {initialData : rnpItem})

        } else {
            res.status(404).send('Rnp item not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

rnpRouter.put('/rnp/:id', isAuthenticated,  upload.single('image'), async (req, res) => {
    
    const { id } = req.params;
    const { title, body, date } = req.body;
    const dateTime = date;
    const file = req.file;

    try {

        let imageUrl = null;

        if (file) {
            
            imageUrl = file.path; // This is Cloudinary's URL for the uploaded image
        }

        const imageurl = imageUrl

        const updatedRnpItem = await Rnp.findByIdAndUpdate(
            id,
            { title, body, dateTime, imageurl},
            { new: true } // Return the updated document
        );
        
        if (updatedRnpItem) {
            res.redirect('/')
        } else {
            res.status(404).send('Rnp item not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

rnpRouter.delete('/deleternp/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Rnp.findByIdAndDelete(id);
        
        if (result) {
            res.status(200).send('Rnp item deleted successfully');
        } else {
            res.status(404).send('Rnp item not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

rnpRouter.put('/publishrnp/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const published = 1;
    try {
        const updatedRnpItem = await Rnp.findByIdAndUpdate(
            id,
            { published},
            { new: true } // Return the updated document
        );
        
        if (updatedRnpItem) {
            res.redirect('/')
        } else {
            res.status(404).send('Rnp item not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

rnpRouter.put('/unpublishrnp/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const published = 0;
    try {
        const updatedRnpItem = await Rnp.findByIdAndUpdate(
            id,
            { published},
            { new: true } // Return the updated document
        );
        
        if (updatedRnpItem) {
            res.redirect('/')
        } else {
            res.status(404).send('Rnp item not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
export default rnpRouter;