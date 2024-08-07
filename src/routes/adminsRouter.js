import { Router } from 'express';
import Admins from '../models/Admins.js';
import News from '../models/News.js';

const adminsRouter = Router();

adminsRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

adminsRouter.get("/admin/news", async (req, res) => {

    try {
        
        const collection = await News.find({}).lean().exec();
        res.json(collection);

    } catch (err) {
        console.error(err);
        res.redirect('/admin/news');
    }
});

adminsRouter.post("/login", async (req, res) =>{

    const { username, password } = req.body;
    console.log("POST request received for /login");

    try {
        
        const admin = await Admins.findOne({ username });

        if (!admin){

            res.status(401).json({ message: 'Username does not exist.' });
            
        } else{

            if (password == admin.password) {

                req.session.adminId = admin._id; // Store admin ID in session
                console.log("Admin logged in:", admin);
                res.status(200).json({ message: 'Login successful.' });
                
                
            } else {

                res.status(401).json({ message: 'Password is incorrect.' });

            }

        }

    }catch{


    }

});

export default adminsRouter;