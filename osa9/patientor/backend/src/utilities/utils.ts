import {
  parseDate,
  parseGender,
  parseSSN,
  parseString,
  parseCode,
  parseHealthCheck,
} from "./parsers";
import { NewEntry, NewPatient } from "./types";

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "ssn" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseString("name", object.name),
      ssn: parseSSN(object),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseString("occupation", object.occupation),
      entries: [],
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  console.log(object);
  if (
    "date" in object &&
    "type" in object &&
    "specialist" in object &&
    "description" in object &&
    "diagnosisCodes" in object
  ) {
    switch (object.type) {
      case "Hospital":
        if ("discharge" in object) {
          console.log("here");
          const discharge = object.discharge as {
            date: unknown;
            criteria: unknown;
          };
          return {
            date: parseDate(object.date),
            type: object.type,
            specialist: parseString("specialist", object.specialist),
            diagnosisCodes: parseCode(object.diagnosisCodes),
            description: parseString("description", object.description),
            discharge: {
              date: parseDate(discharge.date),
              criteria: parseString("criteria", discharge.criteria),
            },
          };
        }
        break;
      case "OccupationalHealthcare":
        if ("employerName" in object && "sickLeave" in object) {
          const sickLeave = object.sickLeave as {
            startDate: unknown;
            endDate: unknown;
          };
          return {
            date: parseDate(object.date),
            type: object.type,
            specialist: parseString("specialist", object.specialist),
            diagnosisCodes: parseCode(object.diagnosisCodes),
            description: parseString("description", object.description),
            employerName: parseString("employer", object.employerName),
            sickLeave: {
              startDate: parseDate(sickLeave.startDate),
              endDate: parseDate(sickLeave.endDate),
            },
          };
        }
        break;
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          return {
            date: parseDate(object.date),
            type: object.type,
            specialist: parseString("specialist", object.specialist),
            diagnosisCodes: parseCode(object.diagnosisCodes),
            description: parseString("description", object.description),
            healthCheckRating: parseHealthCheck(object.healthCheckRating),
          };
        }
        break;
      default:
        return assertNever(object);
    }
  }
  throw new Error("Incorrect or missing data");
};

function assertNever(_entry: any): NewEntry {
  throw new Error("Function not implemented.");
}
