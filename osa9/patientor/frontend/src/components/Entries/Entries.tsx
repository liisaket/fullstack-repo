import { Diagnosis, Entry, Patient, HealthCheckRating } from "../../types";
import diagnosesService from "../../services/diagnoses";
import { useEffect, useState } from "react";
import LocalHospital from "@mui/icons-material/LocalHospital";
import Work from "@mui/icons-material/Work";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

interface EntryProps {
  patient: Patient;
}

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps): JSX.Element => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div key={entry.id}>
          <p>
            <b>{entry.date}</b> <LocalHospital />
          </p>
          <i>{entry.description}</i>
          {entry.discharge && (
            <div>
              <p>
                discharge <b>{entry.discharge.date}</b>:{" "}
                {entry.discharge.criteria}
              </p>
            </div>
          )}
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
          <p>diagnose by {entry.specialist}</p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div key={entry.id}>
          <p>
            <b>{entry.date}</b> <Work /> {entry.employerName}
          </p>
          <i>{entry.description}</i>
          {entry.sickLeave && (
            <div>
              <p>
                sick leave from <b>{entry.sickLeave.startDate}</b> to{" "}
                <b>{entry.sickLeave.endDate}</b>
              </p>
            </div>
          )}
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
          <p>diagnose by {entry.specialist}</p>
        </div>
      );
    case "HealthCheck":
      return (
        <div key={entry.id}>
          <p>
            <b>{entry.date}</b> <MonitorHeartIcon />
          </p>
          <i>{entry.description}</i>
          {entry.healthCheckRating && (
            <div>
              <p>
                health check rating:{" "}
                <b>{HealthCheckRating[entry.healthCheckRating]}</b>
              </p>
            </div>
          )}
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
      );
    default:
      return assertNever(entry);
  }
};

const Entries = ({ patient }: EntryProps): JSX.Element => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

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
          <h2>entries</h2>
          {Object.values(patient.entries).map((entry: Entry) => (
            <div
              key={entry.id}
              style={{
                borderStyle: "solid",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              <EntryDetails entry={entry} diagnoses={diagnoses} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Entries;

function assertNever(_entry: never): JSX.Element {
  throw new Error("Function not implemented.");
}
