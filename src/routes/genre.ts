import express from 'express';
import genreController from '../controllers/genre/index';

const router = express.Router();

router.get('/getAll', genreController.getAllGenres);

export default router;
