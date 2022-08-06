import React from "react";
import { Entry } from "../types";
import { assertNever } from "../helpers";
import HealthCheckEntryComponent from "./HealthCheckEntry";
import OccupationalHealthcareEntryComponent from "./OccupationalHealthcareEntry";
import HospitalEntryComponent from "./HospitalEntry";

const EntryDetails = ({ entry } : { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComponent entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryComponent entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryComponent entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;