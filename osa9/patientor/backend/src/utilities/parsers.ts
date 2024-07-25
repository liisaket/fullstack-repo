import { FinnishSSN } from "finnish-ssn";
import { Gender } from "./types";

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

export const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date of birth");
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
    parseDateOfBirth(object.dateOfBirth);
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
