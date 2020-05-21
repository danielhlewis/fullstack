import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Icon, List } from "semantic-ui-react";
import { useRouteMatch, RouteComponentProps, useParams } from "react-router-dom";

import AddPatientModal from "../AddPatientModal";
import { Patient, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue, updatePatient } from "../state";

interface RouteParams {
  id: string
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const PatientDetailsPage: React.FC = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [ patient, setPatient ] = useState<Patient | null>(null);
  const params = useParams<RouteParams>();

  useEffect(() => {
    if (patients[params.id]?.ssn)
      setPatient(patients[params.id]);
    else {
      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${params.id}`
                  );
                  dispatch(updatePatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      }
      fetchPatient();
    }
    }
  , [params])

  const genderIcon = () => {
    switch(patient?.gender) {
      case "male":
        return <Icon name="mars" />
      case "female":
        return <Icon name="venus" />
      case "other":
        return <Icon name="genderless" />
    }
  }

  const HealthCheckDetails: React.FC<{entry: HealthCheckEntry}> = ({ entry }) => {
    switch(entry.healthCheckRating) {
      case HealthCheckRating.Healthy:
        return <Icon name="heart" color="green" />
      case HealthCheckRating.LowRisk:
        return <Icon name="heart" color="yellow" />
      case HealthCheckRating.HighRisk:
        return <Icon name="heart" color="red" />
      case HealthCheckRating.CriticalRisk:
        return <Icon name="exclamation" color="red" />
    }
  }
  
  const HospitalDetails: React.FC<{entry: HospitalEntry}> = ({ entry }) => {
    return (
      <div>Discharge: {entry.discharge.date} - {entry.discharge.criteria}</div>
    )
  }
  
  const OccupationalHealthcareDetails: React.FC<{entry: OccupationalHealthcareEntry}> = ({ entry }) => {
    if (entry.sickLeave) {
      return <div>Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</div>
    } else {
      return null;
    }
  }

  const EntrySwitch: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch(entry.type) {
      case "HealthCheck":
        return <HealthCheckDetails entry={entry} />
      case "Hospital":
        return <HospitalDetails entry={entry} />
      case "OccupationalHealthcare":
        return <OccupationalHealthcareDetails entry={entry} />
      default:
        return assertNever(entry);
    }
  }

  const EntryTypeIconSwitch: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch(entry.type) {
      case "HealthCheck":
        return <Icon name="doctor" />
      case "Hospital":
        return <Icon name="hospital" />
      case "OccupationalHealthcare":
        return <><Icon name="stethoscope" />{entry.employerName}</>
      default:
        return assertNever(entry);
    }
  }

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => (
    <List.Item key={entry.id}>
      <List.Header>{entry.date} <EntryTypeIconSwitch entry={entry}/></List.Header>
      <div>{entry.description}</div>
      <EntrySwitch entry={entry} />
      <ul>
        {entry.diagnosisCodes?.map(code => (
          <li key={code}>{code} {diagnoses[code]?.name}</li>
        ))}
      </ul>
    </List.Item>
  )

  return (
    <div className="App">
      <Container>
        <h2>
          {patient?.name}
          {genderIcon()}
        </h2>
        <div>ssn: {patient?.ssn}</div>
        <div>occupation: {patient?.occupation}</div>
        <div>date of birth: {patient?.dateOfBirth}</div>
        <h3>entries</h3>
        <List divided>
          {console.log(patient?.entries)}
          {patient?.entries.map((e: Entry) => (
            <EntryDetails entry={e} />
          ))}
        </List>
      </Container>
    </div>
  );
};

export default PatientDetailsPage;
