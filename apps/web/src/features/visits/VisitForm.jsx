import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Button,
  TextField,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const schema = z.object({
  clinician_id: z.coerce.number().positive('Select a clinician'),
  patient_id: z.coerce.number().positive('Select a patient'),
  visited_at: z.string().min(1, 'Visit date is required'),
  notes: z.string().optional(),
});

export default function VisitForm({ onSubmit, clinicians, patients }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      clinician_id: '',
      patient_id: '',
      visited_at: new Date().toISOString().slice(0, 16),
      notes: '',
    },
  });

  const clinicianId = watch('clinician_id');
  const patientId = watch('patient_id');

  const handleFormSubmit = async (data) => {
    await onSubmit({
      clinician_id: Number(data.clinician_id),
      patient_id: Number(data.patient_id),
      visited_at: data.visited_at,
      notes: data.notes || null,
    });
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth error={!!errors.clinician_id} required size="small">
            <InputLabel>Clinician</InputLabel>
            <Select
              value={clinicianId}
              label="Clinician"
              onChange={(e) => setValue('clinician_id', e.target.value)}
            >
              <MenuItem value="">Select</MenuItem>
              {clinicians?.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.first_name} {c.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth error={!!errors.patient_id} required size="small">
            <InputLabel>Patient</InputLabel>
            <Select
              value={patientId}
              label="Patient"
              onChange={(e) => setValue('patient_id', e.target.value)}
            >
              <MenuItem value="">Select</MenuItem>
              {patients?.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.first_name} {p.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Visit Date & Time"
            type="datetime-local"
            {...register('visited_at')}
            error={!!errors.visited_at}
            helperText={errors.visited_at?.message}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Notes"
            {...register('notes')}
            multiline
            rows={2}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            Record Visit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
