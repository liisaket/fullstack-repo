import {
  Button,
  Select,
  TextField,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Grid,
  Input,
} from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Diagnosis, EntryFormValues } from "../../types";
import diagnosesService from "../../services/diagnoses";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface FormData {
  date: string;
  type: "" | "Hospital" | "OccupationalHealthcare" | "HealthCheck";
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
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
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

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const data = await diagnosesService.getAll();
        setDiagnoses(data);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchDiagnoses();
  }, []);

  const handleEventChange = (
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

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    if (name && name in formData) {
      setFormData((data) => ({
        ...data,
        [name as keyof FormData]: value,
      }));
    }
  };

  const handleDiagnosesChange = (event: SelectChangeEvent<string[]>) => {
    setFormData((prevData) => ({
      ...prevData,
      diagnosisCodes: event.target.value as string[],
    }));
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
      diagnosisCodes: formData.diagnosisCodes,
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
        <InputLabel variant="standard">Date</InputLabel>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleEventChange}
        />
        <TextField
          variant="standard"
          label="Specialist"
          name="specialist"
          value={formData.specialist}
          fullWidth
          onChange={handleEventChange}
        />
        <TextField
          variant="standard"
          label="Description"
          name="description"
          value={formData.description}
          fullWidth
          onChange={handleEventChange}
        />
        <FormControl fullWidth>
          <InputLabel variant="standard">Diagnosis codes</InputLabel>
          <Select
            multiple
            variant="standard"
            name="diagnosisCodes"
            label="Diagnosis codes"
            value={formData.diagnosisCodes}
            onChange={handleDiagnosesChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code} - {d.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel variant="standard">Type</InputLabel>
          <Select
            variant="standard"
            name="type"
            value={formData.type}
            onChange={handleSelectChange}
            label="Type"
          >
            <MenuItem key="Hospital" value="Hospital">
              Hospital
            </MenuItem>
            <MenuItem
              key="OccupationalHealthcare"
              value="OccupationalHealthcare"
            >
              Occupational Healthcare
            </MenuItem>
            <MenuItem key="HealthCheck" value="HealthCheck">
              Health Check
            </MenuItem>
          </Select>
        </FormControl>
        {formData.type === "Hospital" && (
          <div>
            <InputLabel variant="standard">Discharge date</InputLabel>
            <Input
              type="date"
              name="dischargeDate"
              value={formData.dischargeDate}
              onChange={handleEventChange}
            />
            <TextField
              variant="standard"
              label="Discharge criteria"
              name="dischargeCriteria"
              value={formData.dischargeCriteria}
              fullWidth
              onChange={handleEventChange}
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
              onChange={handleEventChange}
            />
            <InputLabel
              variant="standard"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              Sick leave
              <InputLabel variant="standard" style={{ margin: "5px" }}>
                start
              </InputLabel>
              <Input
                style={{ marginLeft: "5px" }}
                type="date"
                name="sickLeaveStartDate"
                value={formData.sickLeaveStartDate}
                onChange={handleEventChange}
              />
              <InputLabel variant="standard" style={{ margin: "5px" }}>
                end
              </InputLabel>
              <Input
                style={{ marginLeft: "5px" }}
                type="date"
                name="sickLeaveEndDate"
                value={formData.sickLeaveEndDate}
                onChange={handleEventChange}
              />
            </InputLabel>
          </div>
        )}
        {formData.type === "HealthCheck" && (
          <div>
            <FormControl fullWidth>
              <InputLabel variant="standard">Health check rating</InputLabel>
              <Select
                variant="standard"
                name="healthCheckRating"
                value={formData.healthCheckRating}
                onChange={handleSelectChange}
                label="Health check"
              >
                <MenuItem value="0">Healthy</MenuItem>
                <MenuItem value="1">Low risk</MenuItem>
                <MenuItem value="2">High risk</MenuItem>
                <MenuItem value="3">Critical risk</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left", marginTop: "10px" }}
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
                marginTop: "10px",
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
