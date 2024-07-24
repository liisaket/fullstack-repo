import patientData from '../../data/patients';

import { NonSensitivePatientData, Patient } from '../types/types';

const patients: Patient[] = patientData;

// all data
const getPatients = (): Patient[]=> {
  return patients;
};

// non sensitive data
const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getPatients,
  getNonSensitivePatientData
};