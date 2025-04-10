import { DataTypes, Model } from "sequelize";
import sequelize from '../config/database';



class DoctorModel extends Model {
  id!: number;
  name!: string; 
  speciality!: string; 
  crm!: string; 
}

DoctorModel.init(
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
    speciality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    crm:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: /^\d{4,6}-[A-Z]{2}$/,
          msg: "CRM must be in the format: 4 to 6 digits followed by a dash and 2 uppercase letters (e.g., 123456-SP)"
        }
      }
    },
  },
  {
    sequelize,
    modelName: 'Doctor',
    tableName: 'doctors',
   
  }
);



export default DoctorModel