// src/models/AppointmentModel.ts

import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class AppointmentModel extends Model {
  id!: number;
  patientId!: number;
  doctorId!: number;
  date!: Date;
  status!: "scheduled" | "completed" | "canceled";
}

AppointmentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("scheduled", "completed", "canceled"),
      allowNull: false,
      defaultValue: "scheduled",
    },
  },
  {
    sequelize,
    modelName: "Appointment",
    tableName: "appointments",
  }
);



export default AppointmentModel;
