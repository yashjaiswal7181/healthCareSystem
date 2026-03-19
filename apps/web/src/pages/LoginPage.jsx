import { Box, Container, Paper, Typography } from '@mui/material';
import { LoginForm } from '../features/auth/LoginForm';

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Patient Visit Tracker
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Sign in to continue
          </Typography>
          <LoginForm />
        </Paper>
      </Box>
    </Container>
  );
}
