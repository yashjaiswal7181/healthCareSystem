import { List, ListItem, ListItemText, Typography } from '@mui/material';

export default function PatientList({ patients }) {
  if (!patients?.length) {
    return (
      <Typography color="text.secondary">No patients yet. Add one above.</Typography>
    );
  }

  return (
    <List>
      {patients.map((p) => (
        <ListItem key={p.id}>
          <ListItemText
            primary={`${p.first_name} ${p.last_name}`}
            secondary={p.date_of_birth}
          />
        </ListItem>
      ))}
    </List>
  );
}
