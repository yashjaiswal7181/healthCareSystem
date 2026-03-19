import { useState, useEffect, useCallback } from 'react';
import { Stack } from '@mui/material';
import { PageHeader, SectionCard, EmptyState, LoadingState } from '../components/shared';
import ClinicianForm from '../features/clinicians/ClinicianForm';
import ClinicianList from '../features/clinicians/ClinicianList';
import api from '../services/api';

export default function CliniciansPage() {
  const [clinicians, setClinicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClinicians = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/api/clinicians');
      setClinicians(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load clinicians');
      setClinicians([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClinicians();
  }, [fetchClinicians]);

  const handleCreateClinician = async (data) => {
    await api.post('/api/clinicians', data);
    fetchClinicians();
  };

  const listContent = loading ? (
    <LoadingState message="Loading clinicians..." />
  ) : clinicians?.length > 0 ? (
    <ClinicianList clinicians={clinicians} />
  ) : (
    <EmptyState
      message="No clinicians yet"
      description="Add your first clinician using the form above."
    />
  );

  return (
    <Stack spacing={2}>
      <PageHeader
        title="Clinicians"
        subtitle="Manage clinician records"
      />

      <SectionCard title="Add Clinician">
        <ClinicianForm onSubmit={handleCreateClinician} />
      </SectionCard>

      <SectionCard title="Clinicians">
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
