import { useParams } from "react-router-dom";
import { EntryFormValues, Gender, Patient } from "../../types";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import Female from "@mui/icons-material/Female";
import Male from "@mui/icons-material/Male";
import Entries from "../Entries/Entries";
import AddEntryModal from "../Entries/AddEntryModal";
import { Button } from "@mui/material";
import axios from "axios";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | undefined>();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const updatedPatient = await patientService.createNewEntry(
        id as string,
        values
      );
      setPatient(updatedPatient);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button
            variant="contained"
            style={{ marginBottom: "15px" }}
            onClick={() => openModal()}
          >
            New entry
          </Button>
          <Entries patient={patient} />
        </div>
      )}
    </div>
  );
};

export default PatientPage;
