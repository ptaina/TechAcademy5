import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import DoctorModel from "../models/DoctorModel";
// ✔️ Agora está correto


// Buscar todos os médicos
export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await DoctorModel.findAll();
    return res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Buscar médico por ID
export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doctor = await DoctorModel.findByPk(id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    return res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Criar novo médico
export const createDoctor = async (req: Request, res: Response) => {
  try {
    const { name, speciality, crm } = req.body;

    if (!name || !speciality || !crm) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newDoctor = await DoctorModel.create({ name, speciality, crm });
    return res.status(201).json({ message: "Doctor created successfully", doctor: newDoctor });

  } catch (error) {
    console.error("Error creating doctor:", error);

    if (error instanceof ValidationError) {
      const messages = error.errors.map((e) => e.message);
      return res.status(400).json({ error: messages });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Atualizar médico por ID
export const updateDoctorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, speciality, crm } = req.body;

    const doctor = await DoctorModel.findByPk(id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    if (!name || !speciality || !crm) {
      return res.status(400).json({ error: "All fields are required" });
    }

    doctor.name = name;
    doctor.speciality = speciality;
    doctor.crm = crm;

    await doctor.save();

    return res.status(200).json({ message: "Doctor updated successfully", doctor });

  } catch (error) {
    console.error("Error updating doctor:", error);

    if (error instanceof ValidationError) {
      const messages = error.errors.map((e) => e.message);
      return res.status(400).json({ error: messages });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Deletar médico por ID
export const destroyDoctorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const doctor = await DoctorModel.findByPk(id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    await doctor.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
