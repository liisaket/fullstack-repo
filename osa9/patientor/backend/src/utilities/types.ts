import { FinnishSSN } from "finnish-ssn";

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
}
export type NewPatient = Omit<Patient, "id">;

export type NonSensitivePatientData = Omit<Patient, "ssn">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
