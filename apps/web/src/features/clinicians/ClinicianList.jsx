import { List, ListItem, ListItemText, Typography } from '@mui/material';

export default function ClinicianList({ clinicians }) {
  if (!clinicians?.length) {
    return (
      <Typography color="text.secondary">No clinicians yet. Add one above.</Typography>
    );
  }

  return (
    <List>
      {clinicians.map((c) => (
        <ListItem key={c.id}>
          <ListItemText
            primary={`${c.first_name} ${c.last_name}`}
            secondary={c.specialty}
          />
        </ListItem>
      ))}
    </List>
  );
}
