import { useState, useEffect, useCallback } from 'react';
import { Stack } from '@mui/material';
import { PageHeader, SectionCard, EmptyState, LoadingState } from '../components/shared';
import PatientForm from '../features/patients/PatientForm';
import PatientList from '../features/patients/PatientList';
import api from '../services/api';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/api/patients');
      setPatients(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load patients');
      setPatients([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleCreatePatient = async (data) => {
    await api.post('/api/patients', data);
    fetchPatients();
  };

  const listContent = loading ? (
    <LoadingState message="Loading patients..." />
  ) : patients?.length > 0 ? (
    <PatientList patients={patients} />
  ) : (
    <EmptyState
      message="No patients yet"
      description="Add your first patient using the form above."
    />
  );

  return (
    <Stack spacing={2}>
      <PageHeader
        title="Patients"
        subtitle="Manage patient records"
      />

      <SectionCard title="Add Patient">
        <PatientForm onSubmit={handleCreatePatient} />
      </SectionCard>

      <SectionCard title="Patients">
        {error ? (
          <EmptyState
            message={error}
            description="Check that the API is running and try again."
          />
        ) : (
          listContent
        )}
      </SectionCard>
    </Stack>
  );
}
