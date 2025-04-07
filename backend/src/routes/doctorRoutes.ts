import express from 'express';
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctorById,
  destroyDoctorById
} from '../controllers/doctorController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/doctors', authMiddleware, getAllDoctors);
router.get('/doctors/:id', authMiddleware, getDoctorById);
router.post('/doctors', authMiddleware, createDoctor);
router.put('/doctors/:id', authMiddleware, updateDoctorById);
router.delete('/doctors/:id', authMiddleware, destroyDoctorById);

export default router;
