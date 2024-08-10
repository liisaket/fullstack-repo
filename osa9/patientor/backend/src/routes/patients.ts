import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utilities/utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const patient = patientService.findById(req.params.id);
    if (!patient) {
      return res.sendStatus(404);
    }
    const updatedPatient = patientService.addEntry(patient, newEntry);
    return res.json(updatedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

export default router;
