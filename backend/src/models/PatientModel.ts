
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";



class PatientModel extends Model {
  id!: number;
  name!: string;           
  cpf!: string;            
  phone!: string;          
  address!: string;        
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
        len: [11, 11], 
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
