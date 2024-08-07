import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary with your credentials
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create Cloudinary storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'uploads', // Optional: specify folder name on Cloudinary
    format: async (req, file) => 'jpg', // Optional: specify file format (e.g., 'jpg', 'png')
    public_id: (req, file) => file.originalname.split('.')[0] // Optional: specify file name
  },
});

// Initialize Multer with the Cloudinary storage engine
const upload = multer({ storage: storage });

export default upload;