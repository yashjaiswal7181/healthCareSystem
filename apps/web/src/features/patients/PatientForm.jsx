import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, TextField, Box, Stack } from '@mui/material';

const schema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
});

export default function PatientForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { first_name: '', last_name: '', date_of_birth: '' },
  });

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={2} maxWidth={400}>
        <TextField
          label="First Name"
          {...register('first_name')}
          error={!!errors.first_name}
          helperText={errors.first_name?.message}
          fullWidth
          required
        />
        <TextField
          label="Last Name"
          {...register('last_name')}
          error={!!errors.last_name}
          helperText={errors.last_name?.message}
          fullWidth
          required
        />
        <TextField
          label="Date of Birth"
          type="date"
          {...register('date_of_birth')}
          error={!!errors.date_of_birth}
          helperText={errors.date_of_birth?.message}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
        />
        <Button type="submit" variant="contained">
          Add Patient
        </Button>
      </Stack>
    </Box>
  );
}
