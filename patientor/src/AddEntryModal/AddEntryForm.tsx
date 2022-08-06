import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, TypeOption, HealthCheckRatingOption, DiagnosisSelection } from "./FormField";
import { EntryTypes, HealthCheckEntry, HealthCheckRating, HospitalFormEntry, OccupationalHealthcareFormEntry } from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<HealthCheckEntry, "id"> | Omit<HospitalFormEntry, "id"> | Omit<OccupationalHealthcareFormEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: EntryTypes.Healthcheck, label: "Healthcheck" },
  { value: EntryTypes.Hospital, label: "Hospital" },
  { value: EntryTypes.OccupationalHealthcare, label: "Occupational Healthcare" }
];
const ratingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critcal Risk" }
];

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        healthCheckRating: 0,
        description: "",
        date: "",
        specialist: "",
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === "Hospital" && !values.dischargeDate) {
          errors.dischargeDate = requiredError;
        }
        if (values.type === "Hospital" && !values.dischargeCriteria) {
          errors.dischargeCriteria = requiredError;
        }
        if (values.type === "OccupationalHealthcare" && !values.employerName) {
          errors.employerName = requiredError;
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
              label="Description"
              placeholder="Describe any symptoms or notes from the appt"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist who conducted the appt"
              name="specialist"
              component={TextField}
            />

            {values.type === "HealthCheck" && (
              <SelectField
                label="HealthCheckRating"
                name="healthCheckRating"
                options={ratingOptions}
              />
            )}

            {values.type === "OccupationalHealthcare" && (
              <Field
                label="Employer Name"
                placeholder="Employer Name"
                name="employerName"
                component={TextField}
              />
            )}

            {values.type === "OccupationalHealthcare" && (
              <Field
                label="Sick Leave Start Date (optional)"
                placeholder="YYYY-MM-DD"
                name="sickLeaveStart"
                component={TextField}
              />
            )}

            {values.type === "OccupationalHealthcare" && (
              <Field
                label="Sick Leave End Date (optional)"
                placeholder="YYYY-MM-DD"
                name="sickLeaveEnd"
                component={TextField}
              />
            )}

            {values.type === "Hospital" && (
              <Field
                label="Discharge Date"
                placeholder="YYYY-MM-DD"
                name="dischargeDate"
                component={TextField}
              />
            )}

            {values.type === "Hospital" && (
              <Field
                label="Discharge Criteria"
                placeholder="Enter criteria for patient discharge"
                name="dischargeCriteria"
                component={TextField}
              />
            )}

            <DiagnosisSelection            
              setFieldValue={setFieldValue}            
              setFieldTouched={setFieldTouched}            
              diagnoses={Object.values(diagnoses)}          
            />    
            
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
