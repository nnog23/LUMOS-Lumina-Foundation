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

rnpRouter.get('/admin/forms/edit/editRnp/:id', async (req, res) => {
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

rnpRouter.put('/rnp/:id', async (req, res) => {
    const { id } = req.params;
    const { title, body, date } = req.body;
    try {
        const updatedRnpItem = await Rnp.findByIdAndUpdate(
            id,
            { title, body, date},
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

rnpRouter.delete('/deleternp/:id', async (req, res) => {
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

rnpRouter.put('/publishrnp/:id', async (req, res) => {
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

rnpRouter.put('/unpublishrnp/:id', async (req, res) => {
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