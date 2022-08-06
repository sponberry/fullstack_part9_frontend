import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import Diagnoses from "./Diagnoses";

const OccupationalHealthcareEntryComponent = ( { entry } : { entry: OccupationalHealthcareEntry }) => {
  return (
    <div key={entry.id} style={{ "border": "solid 1px black", "margin": "0.5rem 0", "borderRadius": "1rem" }}>
      <div style={{ "padding": "1rem" }}>
      <strong>{entry.date} 💼</strong>
        <p>{entry.description}</p>
        <p>Employer: {entry.employerName} </p> 
        <p>{entry.sickLeave ? <span style={{ "color": "red" }}>Sick leave required</span> : <span style={{ "color": "green" }}>Cleared for work</span>}</p>
        <Diagnoses entry={entry} />
      </div>
    </div>
  );
};

export default OccupationalHealthcareEntryComponent;