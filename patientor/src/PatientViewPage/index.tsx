import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Button } from "semantic-ui-react";
import EntryDetails from "../EntryDetails";

import { Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";
import { setSinglePatient } from "../state";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { createPatientEntry } from "../state";

const PatientViewPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  // change the form field file to use all the types from diagnosis - start with one entry type
  // add the right api call to submit and check response is ok
  // update patient with the new entry when submitted.
  // add multiple entry types (dependant on type selected in dropdown it should change)
  // test they all submit correctly

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      // change this to correct endpoint and data
      const { data: newEntryData } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(createPatientEntry(newEntryData, patients[id]));
      closeModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  React.useEffect(() => {
    if (patients[id] && patients[id].ssn) return;
    const fetchPatientList = async () => {
      try {
        const { data: singlePatientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setSinglePatient(singlePatientData));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Container textAlign="left">
        <h1>Patient</h1>
        <p></p>
      </Container>
      <Container textAlign="left">
        <HealthRatingBar showText={false} rating={1} />  
        <br />
      </Container>
      <Container textAlign="left">
        <h2>{patients[id]?.name}</h2>
      </Container>
      <Container textAlign="left">
        <br />

        <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      /> 
      <Button onClick={() => openModal()}>Add New Entry</Button>

        <p>ssh: {patients[id]?.ssn || 'no ssn'}</p>
        <p>occupation: {patients[id]?.occupation}</p>
      </Container>
      <br />
      <Container textAlign="left">
        <h3>Entries</h3>
        
        {patients[id]?.entries?.map((entry: Entry) => {
          return <EntryDetails key={entry.id} entry={entry} />;
        })}
        
      </Container>
    </div>
  );
};

export default PatientViewPage;
