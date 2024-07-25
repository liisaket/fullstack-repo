import diagnosesData from "../../data/diagnoses";

import { Diagnosis } from "../utilities/types";

const diagnoses: Diagnosis[] = diagnosesData;

// all data
const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
