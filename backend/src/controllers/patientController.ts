
import { Request, Response } from "express";
import PatientModel from "../models/PatientModel";



export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await PatientModel.findAll();
    return res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getPatientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patient = await PatientModel.findByPk(id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    return res.status(200).json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const createPatient = async (req: Request, res: Response) => {
  try {
    const { name, cpf, phone, address } = req.body;

    if (!name || !cpf || !phone || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!/^\d{11}$/.test(cpf)) {
      return res.status(400).json({ error: "Invalid CPF format" });
    }

    const existingPatient = await PatientModel.findOne({ where: { cpf } });
    if (existingPatient) {
      return res.status(400).json({ error: "CPF already registered" });
    }

    const newPatient = await PatientModel.create({ name, cpf, phone, address });
    return res.status(201).json({ message: "Patient created successfully", patient: newPatient });
  } catch (error) {
    console.error("Error creating patient:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const updatePatientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, phone, address } = req.body;

    const patient = await PatientModel.findByPk(id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const updates: Partial<PatientModel> = {};
    if (name) updates.name = name;
    if (phone) updates.phone = phone;
    if (address) updates.address = address;

    await PatientModel.update(updates, { where: { id } });

    const updatedPatient = await PatientModel.findByPk(id);
    return res.status(200).json({ message: "Patient updated successfully", patient: updatedPatient });
  } catch (error) {
    console.error("Error updating patient:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const destroyPatientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const patient = await PatientModel.findByPk(id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    await patient.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting patient:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
