

import AppointmentModel from './AppointmentModel';
import PatientModel from './PatientModel';
import DoctorModel from './DoctorModel';

export const associateModels = () => {
  AppointmentModel.belongsTo(PatientModel, { foreignKey: 'patientId', as: 'patient' });
  AppointmentModel.belongsTo(DoctorModel, { foreignKey: 'doctorId', as: 'doctor' });

  PatientModel.hasMany(AppointmentModel, { foreignKey: 'patientId' });
  DoctorModel.hasMany(AppointmentModel, { foreignKey: 'doctorId' });
};

export default associateModels;