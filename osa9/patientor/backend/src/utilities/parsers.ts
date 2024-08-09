import { FinnishSSN } from "finnish-ssn";
import { Gender, HealthCheckRating } from "./types";
import diagnosesService from "../services/diagnosesService";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

export const parseString = (key: string, string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error(`Incorrect type or missing ${key}: "${string}"`);
  }
  return string;
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

export const parseSSN = (object: unknown): FinnishSSN => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("ssn" in object && "dateOfBirth" in object && "gender" in object) {
    parseDate(object.dateOfBirth);
    const { valid, sex, dateOfBirth } = FinnishSSN.parse(object.ssn as string);
    const SSNDateOfBirth = new Date(dateOfBirth);

    const year = SSNDateOfBirth.getFullYear();
    const month = (SSNDateOfBirth.getMonth() + 1).toString().padStart(2, "0");
    const day = SSNDateOfBirth.getDate().toString().padStart(2, "0");

    const formattedDateOfBirth = `${year}-${month}-${day}`;

    if (
      !object.ssn ||
      !isString(object.ssn) ||
      !isDate(object.dateOfBirth as string) ||
      !valid || // check if SSN is valid
      sex !== object.gender || // check if SSN gender matches given
      formattedDateOfBirth !== object.dateOfBirth // check if SSN DoB matches given
    ) {
      throw new Error(
        `Incorrect, missing or not matching SSN: ${object.ssn as string}`
      );
    }
    return object.ssn;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export const parseCode = (diagnosisCodes: unknown): Array<string> => {
  const diagnoses = diagnosesService.getDiagnoses();
  if (
    Array.isArray(diagnosisCodes) &&
    diagnosisCodes.every((code) => typeof code === "string") &&
    diagnosisCodes.every((code) =>
      diagnoses.some((diagnosis) => diagnosis.code === code)
    )
  ) {
    return diagnosisCodes;
  }
  throw new Error("Incorrect data: diagnosis codes are incorrect");
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((r) => r)
    .includes(param);
};

export const parseHealthCheck = (rating: unknown): HealthCheckRating => {
  if (!rating || typeof rating !== "number" || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing health check rating: ${rating}`);
  }
  return rating;
};
