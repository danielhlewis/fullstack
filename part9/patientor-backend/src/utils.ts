import { NewPatient, Gender, NewEntry, HealthCheckRating, SickLeave, Discharge } from './types'

/* eslint-disable @typescript-eslint/no-explicit-any */

export const toNewEntry = (object: any): NewEntry => {
  switch(object.type) {
    case "HealthCheck":
      return {
        type: "HealthCheck",
        description: parseString(object.description, "description"),
        date: parseDate(object.date, "date"),
        specialist: parseString(object.specialist, "specialist"),
        diagnosisCodes: (object.diagnosisCodes) ? parseStringArray(object.diagnosisCodes, "diagnosisCodes") : undefined,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      }
    case "OccupationalHealthcare":
      return {
        type: "OccupationalHealthcare",
        description: parseString(object.description, "description"),
        date: parseDate(object.date, "date"),
        specialist: parseString(object.specialist, "specialist"),
        diagnosisCodes: (object.diagnosisCodes) ? parseStringArray(object.diagnosisCodes, "diagnosisCodes") : undefined,
        employerName: parseString(object.employerName, "employerName"),
        sickLeave: (object.sickLeave) ? parseSickLeave(object.sickLeave) : undefined
      }
    case "Hospital":
      return {
        type: "Hospital",
        description: parseString(object.description, "description"),
        date: parseDate(object.date, "date"),
        specialist: parseString(object.specialist, "specialist"),
        diagnosisCodes: (object.diagnosisCodes) ? parseStringArray(object.diagnosisCodes, "diagnosisCodes") : undefined,
        discharge: parseDischarge(object.discharge)
      }
    default:
      throw new Error("Bad Entry Type");
  }
}

const parseDischarge = (discharge: any) : Discharge => {
  if (!discharge)
    throw new Error("Missing Discharge");
  return {
    date: parseDate(discharge.date, "discharge date"),
    criteria: parseString(discharge.criteria, "discharge criteria")
  }
}

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave)
    throw new Error("Missing Sick Leave");
  return {
    startDate: parseDate(sickLeave.startDate, "sickLeave startDate"),
    endDate: parseDate(sickLeave.endDate, "sickLeave endDate")
  }
}

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
      throw new Error('Incorrect or missing HealthCheckRating: ' + rating);
  } 
  return rating;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseStringArray = (s: any, name: string): Array<string> => {
  if (!s || !Array.isArray(s) || s.reduce((allStrings, cur) => !isString(cur) ? false : allStrings, true)) {
    throw new Error(`Incorrect or missing ${name}: ${s}`);
  }
  return s;
}

const parseString = (s: any, name: string): string => {
  if (!s || !isString(s)) {
    throw new Error(`Incorrect or missing ${name}: ${s}`);
  }
  return s;
}

const parseDate = (date: any, name: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing ${name}: ${date}`);
  }
  return date;
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  }
}

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
}

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
}

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
}

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  } 
  return gender;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
