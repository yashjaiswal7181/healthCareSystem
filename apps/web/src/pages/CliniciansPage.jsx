import { Box, Typography } from '@mui/material';
import { ClinicianForm } from '../features/clinicians/ClinicianForm';
import { ClinicianList } from '../features/clinicians/ClinicianList';

export function CliniciansPage() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Clinicians
      </Typography>
      <ClinicianForm />
      <ClinicianList />
    </Box>
  );
}
