import express from 'express';
import auth from './auth.js';
import imageGenerator from './imageGenerator.js';
import verifyAPIKey from '../middlewares/verifyApiKey.js';

const router = express.Router();

// Auth create a new api key -> /api/auth/api-ley
// No auth required -> apiKey header not required
router.use('/auth', auth);

// Image generator -> /api/image-generator
// Auth required -> apiKey header required
// use middleware to veri api key

router.use(verifyAPIKey);
router.use('/image-generator', imageGenerator);

export default router;
