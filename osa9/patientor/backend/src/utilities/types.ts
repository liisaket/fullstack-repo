import { FinnishSSN } from "finnish-ssn";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: FinnishSSN;
  gender: string;
  occupation: string;
  entries: Entry[];
}
export type NewPatient = Omit<Patient, "id">;

export type NonSensitivePatientData = Omit<Patient, "ssn" | "entries">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
