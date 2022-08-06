import React from "react";
import { HealthCheckEntry } from "../types";
import Diagnoses from "./Diagnoses";

const HealthCheckEntryComponent = ( { entry } : { entry: HealthCheckEntry }) => {
  return (
      <div key={entry.id} style={{ "border": "solid 1px black", "margin": "0.5rem 0", "borderRadius": "1rem" }}>
        <div style={{ "padding": "1rem" }}>
          <strong>{entry.date} 💉</strong> 
          <p>{entry.description}</p>
          <p>{entry.healthCheckRating <= 1 ? '💚' : '💛'}</p>
          <Diagnoses entry={entry} />
        </div>
      </div>
  );
};

export default HealthCheckEntryComponent;