import React from "react";
import { HospitalEntry } from "../types";
import Diagnoses from "./Diagnoses";

const HospitalEntryComponent = ( { entry } : { entry: HospitalEntry }) => {
  return (
    <div key={entry.id} style={{ "border": "solid 1px black", "margin": "0.5rem 0", "borderRadius": "1rem" }}>
      <div style={{ "padding": "1rem" }}>
      <strong>{entry.date} 🏥</strong>
        <p>{entry.description}</p>
        <strong>Discharge details</strong>
        { entry.discharge 
        ? <div><p><em>Date:</em> {entry.discharge?.date}</p><p><em>Details:</em> {entry.discharge?.criteria}</p></div>
        : 'No details'
        }
        <Diagnoses entry={entry} />
      </div>
    </div>
  );
};

export default HospitalEntryComponent;