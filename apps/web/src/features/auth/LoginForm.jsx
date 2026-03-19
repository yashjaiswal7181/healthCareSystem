import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, TextField, Box, Paper, Typography } from '@mui/material';
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data) => {
    login(data.email);
    const from = location.state?.from?.pathname || '/clinicians';
    navigate(from, { replace: true });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Paper sx={{ p: 2, maxWidth: 400, width: '100%' }} elevation={3}>
        <Typography variant="h5" component="h1" gutterBottom>
          Patient Visit Tracker
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Enter your email to continue
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('email')}
            label="Email"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
