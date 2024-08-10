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

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionOmit<T, K extends keyof any> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, "id">;

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

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
