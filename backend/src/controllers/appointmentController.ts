import { Request, Response } from "express";
import AppointmentModel from "../models/AppointmentModel";
import PatientModel from "../models/PatientModel";
import DoctorModel from "../models/DoctorModel";

// Criar nova consulta
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { patientId, doctorId, date, status } = req.body;

    if (!patientId || !doctorId || !date) {
      return res.status(400).json({ error: "Patient, doctor and date are required" });
    }

    const newAppointment = await AppointmentModel.create({
      patientId,
      doctorId,
      date,
      status: status || "scheduled",
    });

    return res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", (error as Error).message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Buscar todas as consultas com dados do paciente e médico
export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await AppointmentModel.findAll({
      include: [
        { model: PatientModel, as: "patient" },
        { model: DoctorModel, as: "doctor" },
      ],
    });

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", (error as Error).message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Atualizar o status da consulta
export const updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    if (!["scheduled", "completed", "canceled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const appointment = await AppointmentModel.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    return res.status(200).json({ message: "Status updated successfully", appointment });
  } catch (error) {
    console.error("Error updating appointment:", (error as Error).message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
