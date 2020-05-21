import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, NumberField, DiagnosisSelection, TypeOption } from "./FormField";
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state"

/*
 * use type Entry, but omit id and entries,
 * because those are irrelevant for new Entry object.
 */
export type EntryFormValues = Omit<HealthCheckEntry, "id"> | Omit<HospitalEntry, "id"> | Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "Hospital", label: "Hospital Visit" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" }
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue()

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        date: "",
        description: "",
        specialist: "",
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === "HealthCheck" && (values.healthCheckRating < 0 || values.healthCheckRating > 3)) {
          errors.healthCheckRating = requiredError;
        }
        if (values.type === "Hospital") {
          if (!values.discharge) {
            errors["discharge.date"] = requiredError;
            errors["discharge.criteria"] = requiredError;
          } else {
            if (!values.discharge.date) {
              errors["discharge.date"] = requiredError;
            }
            if (!values.discharge.criteria) {
              errors["discharge.criteria"] = requiredError;
            }
          }
        }
        if (values.type === "OccupationalHealthcare") {
          if (!values.employerName) {
            errors["employerName"] = requiredError;
          } else {
            if ((!values.sickLeave?.startDate && values.sickLeave?.endDate) ||
                (values.sickLeave?.startDate && !values.sickLeave?.endDate)) {
              if (!values.sickLeave?.startDate && values.sickLeave?.endDate)
                errors["sickLeave.startDate"] = requiredError;
              else
                errors["sickLeave.endDate"] = requiredError;
            }
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              options={typeOptions}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description of Visit"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {(values.type === "HealthCheck") ?
            <Field
              label="Health Check Rating (0 = Healthy, 1 = Low risk, 2 = High Risk, 3 = Critical Risk)"
              name="healthCheckRating"
              min={0}
              max={3}
              component={NumberField}
            /> : null}
            {(values.type === "Hospital") ?
            <>
              <Field
                label="Discharge Date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
              />
              <Field
                label="Discharge Criteria"
                placeholder="Criteria"
                name="discharge.criteria"
                component={TextField}
              />
            </>
            : null}
            {(values.type === "OccupationalHealthcare") ?
            <>
              <Field
                label="Employer Name"
                placeholder="Employer"
                name="employerName"
                component={TextField}
              />
              <Field
                label="Sick Leave Start Date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextField}
              />
              <Field
                label="Sick Leave End Date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
                component={TextField}
              />
            </>
            : null}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
