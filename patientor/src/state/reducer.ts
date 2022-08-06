import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
      type: "SET_SINGLE_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_PATIENT_ENTRY";
    payload: Patient,
    newEntry: Entry,
    };

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patientListFromApi };
};

export const setDiagnoses = (diagnosesFromApi: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSES", payload: diagnosesFromApi };
};

export const createPatient = (singlePatientData: Patient): Action => {
  return { type: "SET_SINGLE_PATIENT", payload: singlePatientData };
};

export const createPatientEntry = (entryData: Entry, singlePatientData: Patient): Action => {
  return { type: "SET_PATIENT_ENTRY", payload: singlePatientData , newEntry: entryData};
};

export const setSinglePatient = (newPatient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: newPatient };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_SINGLE_PATIENT":
      if (state.patients[action.payload.id] && state.patients[action.payload.id].ssn) {
        console.log('patient already exists');
        return state;
      }
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_ENTRY":
      const updatedEntries: Entry[] = [ action.newEntry ];
      state.patients[action.payload.id].entries?.forEach(entry => updatedEntries.push(entry));
      const updatedPatient: Patient = { ...state.patients[action.payload.id], entries: updatedEntries };
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: updatedPatient
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
