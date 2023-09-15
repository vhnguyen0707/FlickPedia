import express from 'express';
import mediaController from '../controllers/mediaControllers.js';

const router = express.Router({ mergeParams: true }); //always  have access to params from parent routers

router.get('/search', mediaController.search);
router.get('/genres', mediaController.getGenres);
router.get('/detail/:mediaId', mediaController.getDetail);
router.get('/:mediaCategory', mediaController.getList);

export default router;
