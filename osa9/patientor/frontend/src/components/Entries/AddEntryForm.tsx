import {
  Button,
  Select,
  TextField,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Entry, EntryFormValues } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface FormData {
  date: string;
  type: "" | "Hospital" | "OccupationalHealthcare" | "HealthCheck";
  description: string;
  specialist: string;
  diagnosisCodes: string;
  dischargeDate?: string;
  dischargeCriteria?: string;
  employerName?: string;
  sickLeaveStartDate?: string;
  sickLeaveEndDate?: string;
  healthCheckRating?: string;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    date: "",
    type: "",
    description: "",
    specialist: "",
    diagnosisCodes: "",
    dischargeDate: "",
    dischargeCriteria: "",
    employerName: "",
    sickLeaveStartDate: "",
    sickLeaveEndDate: "",
    healthCheckRating: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | { name: string; value: unknown }
    >
  ) => {
    const { name, value } = event.target;
    if (name && name in formData) {
      setFormData((data) => ({
        ...data,
        [name as keyof FormData]: value,
      }));
    }
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    if (name && name in formData) {
      setFormData((data) => ({
        ...data,
        [name as keyof FormData]: value,
      }));
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date: formData.date,
      type: formData.type as
        | "Hospital"
        | "OccupationalHealthcare"
        | "HealthCheck",
      specialist: formData.specialist,
      description: formData.description,
      diagnosisCodes: formData.diagnosisCodes.split(", "),
      discharge: {
        date: formData.dischargeDate as string,
        criteria: formData.dischargeCriteria as string,
      },
      employerName: formData.employerName as string,
      sickLeave: {
        startDate: formData.sickLeaveStartDate as string,
        endDate: formData.sickLeaveEndDate as string,
      },
      healthCheckRating: Number(formData.healthCheckRating),
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          variant="standard"
          label="Date"
          placeholder="YYYY-MM-DD"
          name="date"
          value={formData.date}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          variant="standard"
          label="Specialist"
          name="specialist"
          value={formData.specialist}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          variant="standard"
          label="Description"
          name="description"
          value={formData.description}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          variant="standard"
          label="Diagnosis codes"
          name="diagnosisCodes"
          value={formData.diagnosisCodes}
          fullWidth
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel variant="standard">Type</InputLabel>
          <Select
            variant="standard"
            name="type"
            value={formData.type}
            onChange={handleTypeChange}
            label="Type"
          >
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
            <MenuItem value="HealthCheck">Health Check</MenuItem>
          </Select>
        </FormControl>
        {formData.type === "Hospital" && (
          <div>
            <TextField
              variant="standard"
              label="Discharge date"
              name="dischargeDate"
              placeholder="YYYY-MM-DD"
              value={formData.dischargeDate}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              label="Discharge criteria"
              name="dischargeCriteria"
              value={formData.dischargeCriteria}
              fullWidth
              onChange={handleChange}
            />
          </div>
        )}
        {formData.type === "OccupationalHealthcare" && (
          <div>
            <TextField
              variant="standard"
              label="Employer"
              name="employerName"
              value={formData.employerName}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              label="Sick leave start date"
              name="sickLeaveStartDate"
              placeholder="YYYY-MM-DD"
              value={formData.sickLeaveStartDate}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              label="Sick leave end date"
              name="sickLeaveEndDate"
              placeholder="YYYY-MM-DD"
              value={formData.sickLeaveEndDate}
              fullWidth
              onChange={handleChange}
            />
          </div>
        )}
        {formData.type === "HealthCheck" && (
          <div>
            <TextField
              variant="standard"
              label="Health check rating"
              name="healthCheckRating"
              placeholder="0=Healthy 1=Low risk 2=High risk 3=Critical risk"
              value={formData.healthCheckRating}
              fullWidth
              onChange={handleChange}
            />
          </div>
        )}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
