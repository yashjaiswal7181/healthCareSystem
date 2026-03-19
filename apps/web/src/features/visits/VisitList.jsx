import {
  List,
  ListItem,
  ListItemText,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

export default function VisitList({
  visits,
  clinicians,
  patients,
  filters,
  onFilterChange,
}) {
  if (!visits?.length) {
    return (
      <Typography color="text.secondary">
        No visits yet. Record one above.
      </Typography>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Filter by Clinician</InputLabel>
          <Select
            value={filters.clinicianId || ''}
            label="Filter by Clinician"
            onChange={(e) =>
              onFilterChange({ ...filters, clinicianId: e.target.value || null })
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
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Filter by Patient</InputLabel>
          <Select
            value={filters.patientId || ''}
            label="Filter by Patient"
            onChange={(e) =>
              onFilterChange({ ...filters, patientId: e.target.value || null })
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
      </Box>
      <List>
        {visits.map((v) => (
          <ListItem key={v.id}>
            <ListItemText
              primary={`${v.clinician?.first_name} ${v.clinician?.last_name} → ${v.patient?.first_name} ${v.patient?.last_name}`}
              secondary={
                <>
                  {new Date(v.visited_at).toLocaleString()}
                  {v.notes && ` • ${v.notes}`}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
