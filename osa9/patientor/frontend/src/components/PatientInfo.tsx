import { useParams } from "react-router-dom";
import { Diagnosis, Entry, Gender, Patient } from "../types";
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";
import { useEffect, useState } from "react";
import Female from "@mui/icons-material/Female";
import Male from "@mui/icons-material/Male";

const PatientInfo = () => {
  const [patient, setPatient] = useState<Patient | undefined>();
  const { id } = useParams<{ id: string }>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await patientService.getPatient(id as string);
        setPatient(patient);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const data = await diagnosesService.getAll();
        setDiagnoses(data);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchDiagnoses();
  }, []);

  return (
    <div>
      {patient && (
        <div>
          <h1>
            {patient.name}{" "}
            {(patient.gender == Gender.Female && <Female />) ||
              (patient.gender == Gender.Male && <Male />)}
          </h1>
          <p>ssh: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <h2>entries</h2>
          {Object.values(patient.entries).map((entry: Entry) => (
            <div key={entry.id}>
              <p>
                {entry.date} <i>{entry.description}</i>
              </p>
              {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                <ul>
                  {entry.diagnosisCodes.map((code) => {
                    const diagnosis = diagnoses?.find((d) => d.code === code);
                    return (
                      <li key={code}>
                        {code} {diagnosis ? diagnosis.name : ""}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientInfo;
