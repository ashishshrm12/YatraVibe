import express from 'express';
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyToken.js';
const router=express.Router();

router.put('/:id',verifyToken,updateUser);
router.delete('/:id',verifyToken,deleteUser);
router.get('/:id',verifyToken,getSingleUser);
router.get('/',verifyToken,getAllUser);

export default router;