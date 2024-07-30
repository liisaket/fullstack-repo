import { useParams } from "react-router-dom";
import { Patient } from "../types";
import patientService from "../services/patients";
import { useEffect, useState } from "react";

const PatientInfo = () => {
  const [patient, setPatient] = useState<Patient | undefined>();
  const { id } = useParams<{ id: string }>();

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

  return (
    <div>
      {patient && (
        <div>
          <h1>{patient.name}</h1>
          <p>ssh: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
        </div>
      )}
    </div>
  );
};

export default PatientInfo;
