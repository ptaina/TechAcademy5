import express from "express";
import {
  createAppointment,
  getAllAppointments,
  updateAppointmentStatus
} from "../controllers/appointmentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/appointments", authMiddleware, getAllAppointments);
router.post("/appointments", authMiddleware, createAppointment);
router.put("/appointments/:id/status", authMiddleware, updateAppointmentStatus);

export default router;
