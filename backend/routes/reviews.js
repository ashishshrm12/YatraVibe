import express from 'express'
import { createReviwe } from '../controllers/reviewController.js';
import { verifyUser } from '../utils/verifyToken.js';


const router=express.Router();

router.post('/:tourId',verifyUser,createReviwe);

export default router