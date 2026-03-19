import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, TextField, Box, Stack } from '@mui/material';

const schema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  specialty: z.string().min(1, 'Specialty is required'),
});

export default function ClinicianForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { first_name: '', last_name: '', specialty: '' },
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
          label="Specialty"
          {...register('specialty')}
          error={!!errors.specialty}
          helperText={errors.specialty?.message}
          fullWidth
          required
        />
        <Button type="submit" variant="contained">
          Add Clinician
        </Button>
      </Stack>
    </Box>
  );
}
