import express from 'express'
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from '../controllers/tourController.js'

const router=express.Router()
import { verifyAdmin } from '../utils/verifyToken.js';

router.post('/',verifyAdmin,createTour);

router.put('/:id',verifyAdmin,updateTour);
router.delete('/:id',verifyAdmin,deleteTour);
router.get('/search/getTourBySearch',getTourBySearch);
router.get('/search/getFeaturedTours',getFeaturedTour);
router.get('/search/getTourCount',getTourCount);
router.get('/:id',getSingleTour);
router.get('/',getAllTour);


export default router;