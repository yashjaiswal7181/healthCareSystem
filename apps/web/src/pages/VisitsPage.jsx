import { Box, Typography } from '@mui/material';
import { VisitForm } from '../features/visits/VisitForm';
import { VisitList } from '../features/visits/VisitList';

export function VisitsPage() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Visits
      </Typography>
      <VisitForm />
      <VisitList />
    </Box>
  );
}
