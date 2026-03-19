import { useState, useEffect, useCallback } from 'react';
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  PageHeader,
  SectionCard,
  EmptyState,
  LoadingState,
  FilterBar,
} from '../components/shared';
import VisitForm from '../features/visits/VisitForm';
import VisitsTable from '../features/visits/VisitsTable';
import api from '../services/api';

export default function VisitsPage() {
  const [visits, setVisits] = useState([]);
  const [clinicians, setClinicians] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ clinicianId: '', patientId: '' });

  const fetchClinicians = useCallback(async () => {
    try {
      const res = await api.get('/api/clinicians');
      setClinicians(res.data || []);
    } catch {
      setClinicians([]);
    }
  }, []);

  const fetchPatients = useCallback(async () => {
    try {
      const res = await api.get('/api/patients');
      setPatients(res.data || []);
    } catch {
      setPatients([]);
    }
  }, []);

  const fetchVisits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (filters.clinicianId) params.clinicianId = filters.clinicianId;
      if (filters.patientId) params.patientId = filters.patientId;
      const res = await api.get('/api/visits', { params });
      setVisits(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load visits');
      setVisits([]);
    } finally {
      setLoading(false);
    }
  }, [filters.clinicianId, filters.patientId]);

  useEffect(() => {
    fetchClinicians();
    fetchPatients();
  }, [fetchClinicians, fetchPatients]);

  useEffect(() => {
    fetchVisits();
  }, [fetchVisits]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleCreateVisit = async (data) => {
    await api.post('/api/visits', data);
    fetchVisits();
  };

  const historyContent = loading ? (
    <LoadingState message="Loading visits..." />
  ) : (
    <VisitsTable visits={visits} />
  );

  return (
    <Stack spacing={2}>
      <PageHeader
        title="Visits"
        subtitle="Record and view patient visits"
      />

      

      <SectionCard title="Record Visit">
        <VisitForm
          onSubmit={handleCreateVisit}
          clinicians={clinicians}
          patients={patients}
        />
      </SectionCard>

      <SectionCard title="Visit History">
        <FilterBar sx={{ mb: 2, gap: '16px', display: 'flex' }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Clinician</InputLabel>
            <Select
              value={filters.clinicianId || ''}
              label="Clinician"
              onChange={(e) =>
                handleFilterChange({
                  ...filters,
                  clinicianId: e.target.value || '',
                })
              }
            >
              <MenuItem value="">All</MenuItem>
              {clinicians?.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.first_name} {c.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Patient</InputLabel>
            <Select
              value={filters.patientId || ''}
              label="Patient"
              onChange={(e) =>
                handleFilterChange({
                  ...filters,
                  patientId: e.target.value || '',
                })
              }
            >
              <MenuItem value="">All</MenuItem>
              {patients?.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.first_name} {p.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FilterBar>
        {error ? (
          <EmptyState
            message={error}
            description="Check that the API is running and try again."
          />
        ) : (
          historyContent
        )}
      </SectionCard>
    </Stack>
  );
}
