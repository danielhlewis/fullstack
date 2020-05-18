import patients from '../../data/patients'
import { v4 as uuidv4 } from 'uuid';

import { Patient, PatientNoSSN, NewPatient } from '../types'

const getPatients = () : Patient[] => {
  return patients;
} 

const getPatientsNoSSN = (): PatientNoSSN[] => {
  return patients.map(({ssn, ...rest}) => rest)
}

const addPatient = (patient: NewPatient ): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };
  patients.push(newPatient)
  return newPatient;
};

export default {
  getPatients,
  getPatientsNoSSN,
  addPatient
};