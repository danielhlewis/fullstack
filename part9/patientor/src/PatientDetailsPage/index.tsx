import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Icon, List, Button } from "semantic-ui-react";
import { useRouteMatch, RouteComponentProps, useParams } from "react-router-dom";

import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";
import { Patient, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating } from "../types";
import { apiBaseUrl } from "../constants";
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

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${params.id}/entries`,
        values
      );
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
        <h3>entries</h3>
        <List divided>
          {patient?.entries.map((e: Entry) => (
            <EntryDetails key={e.id} entry={e} />
          ))}
        </List>
      </Container>
    </div>
  );
};

export default PatientDetailsPage;
