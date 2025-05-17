// import express from 'express'

// import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
// import { createBooking, getAllBooking, getBooking,getUserBookings, deleteBooking } from '../controllers/bookingControllers.js';


// const router=express.Router();

// router.post('/',verifyUser,createBooking);
// router.get('/:id',verifyUser,getBooking);
// router.get('/',verifyAdmin, getAllBooking);
// router.get('/user/:userId', verifyUser, getUserBookings);
// router.delete('/:id', verifyUser, deleteBooking);

// export default router
import express from 'express'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import {
  createBooking,
  getAllBooking,
  getBooking,
  getUserBookings,
  deleteBooking
} from '../controllers/bookingControllers.js';

const router = express.Router();

router.post('/', verifyUser, createBooking);
router.get('/user/:userId', verifyUser, getUserBookings); // Moved UP
router.get('/:id', verifyUser, getBooking);
router.get('/', verifyAdmin, getAllBooking);
router.delete('/:id', verifyUser, deleteBooking);

export default router;
