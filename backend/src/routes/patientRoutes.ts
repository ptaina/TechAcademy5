
import express from 'express';
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatientById,
  destroyPatientById,
} from '../controllers/patientController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/patients', authMiddleware, getAllPatients);
router.get('/patients/:id', authMiddleware, getPatientById);
router.post('/patients', authMiddleware, createPatient);
router.put('/patients/:id', authMiddleware, updatePatientById);
router.delete('/patients/:id', authMiddleware, destroyPatientById);

export default router;
