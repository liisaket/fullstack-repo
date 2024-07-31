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
  entries: Entry[];
}

export type NewPatient = Omit<Patient, "id">;

export type NonSensitivePatientData = Omit<Patient, "ssn" | "entries">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry;
//  | HealthCheckEntry;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: { startDate: string; endDate: string };
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: { date: string; criteria: string };
}
