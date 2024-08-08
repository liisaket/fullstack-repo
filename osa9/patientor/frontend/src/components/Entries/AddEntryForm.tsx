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
import { useState } from "react";
import { EntryFormValues } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface FormData {
  date: string;
  type: string;
  description: string;
  specialist: string;
  diagnosisCodes: string[];
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
    diagnosisCodes: [],
    dischargeDate: "",
    dischargeCriteria: "",
    employerName: "",
    sickLeaveStartDate: "",
    sickLeaveEndDate: "",
    healthCheckRating: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | { name?: string; value: unknown }
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

  return (
    <div>
      <form>
        <TextField
          variant="standard"
          label="Date"
          placeholder="YYYY-MM-DD"
          value={formData.date}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          variant="standard"
          label="Specialist"
          value={formData.specialist}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          variant="standard"
          label="Description"
          value={formData.description}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          variant="standard"
          label="Diagnosis codes"
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
              value={formData.dischargeDate}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              label="Discharge criteria"
              placeholder="YYYY-MM-DD"
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
              value={formData.employerName}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              label="Sick leave start date"
              placeholder="YYYY-MM-DD"
              value={formData.sickLeaveStartDate}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              label="Sick leave end date"
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
              placeholder="0-3"
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
