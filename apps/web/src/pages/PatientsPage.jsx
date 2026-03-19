import { Box, Typography } from '@mui/material';
import { PatientForm } from '../features/patients/PatientForm';
import { PatientList } from '../features/patients/PatientList';

export function PatientsPage() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Patients
      </Typography>
      <PatientForm />
      <PatientList />
    </Box>
  );
}
