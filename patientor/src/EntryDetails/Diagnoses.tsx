import React from "react";
import { useStateValue } from "../state";
import { Entry, Diagnosis } from "../types";

const Diagnoses = ( { entry } : { entry: Entry }) => {
  const [{ diagnoses }, ] = useStateValue();

  return (
    <>
      { entry.diagnosisCodes
        ? <h4 style={{ "textDecoration": "underline" }}>Diagnoses</h4>
        : ''
      }
      <ul>
        {entry.diagnosisCodes?.map((code: Diagnosis['code']) => {
            return (<li key={code}>{code}: {diagnoses[code]?.name}</li>);
        })}
      </ul>
    </>
  );
};

export default Diagnoses;