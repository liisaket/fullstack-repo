import diagnosesData from '../../data/diagnoses';

import { Diagnosis } from '../types/types';

const diagnoses: Diagnosis[] = diagnosesData;

// all data
const getDiagnoses = (): Diagnosis[]=> {
  return diagnoses;
};

export default {
  getDiagnoses
};