import patients from '../../data/patients'
import { v4 as uuidv4 } from 'uuid';

import { Patient, PatientNoSSN, NewPatient, NewEntry } from '../types'

const getPatients = () : Patient[] => {
  return patients;
} 

const getPatientsNoSSN = (): PatientNoSSN[] => {
  return patients.map(({ssn, ...rest}) => rest)
}

const getPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id)
}

const addPatient = (patient: NewPatient ): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };
  patients.push(newPatient)
  return newPatient;
};

const addPatientEntry = (patient: Patient, entry: NewEntry): Patient => {
  const newEntry = {
    id: uuidv4(),
    ...entry
  }
  const newPatient = {
    ...patient, 
    entries: [...patient.entries, newEntry]
  }
  const index = patients.findIndex(x => x.id === newPatient.id);
  patients[index] = newPatient;
  return newPatient;
}

export default {
  getPatients,
  getPatientsNoSSN,
  getPatient,
  addPatient,
  addPatientEntry
};