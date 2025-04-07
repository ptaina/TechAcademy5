
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";


// Modelo do paciente usando classe e init
class PatientModel extends Model {
  id!: number;
  name!: string;           // Nome do paciente
  cpf!: string;            // CPF do paciente
  phone!: string;          // Telefone de contato
  address!: string;        // Endereço
}

PatientModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [11, 11], // CPF deve ter 11 caracteres
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Patient',
    tableName: 'patients',
  }
);



export default PatientModel;
