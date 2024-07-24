/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.post('/', (req, res) => {
  const { name, ssn, dateOfBirth, occupation, gender } = req.body;
  const addedPatient = patientService.addPatient({
    name,
    ssn,
    dateOfBirth,
    gender,
    occupation
  });
  res.json(addedPatient);
});

export default router;