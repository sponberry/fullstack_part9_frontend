import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnoses } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientViewPage from "./PatientViewPage";

const App = () => {
  const [, dispatch] = useStateValue();
  
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
        console.log(patientListFromApi);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
    
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoses(diagnosesFromApi));
        console.log(diagnosesFromApi);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id">
              <PatientViewPage />
            </Route>
            <Route path="/">
              <PatientListPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
