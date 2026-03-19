import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

/**
 * Clean, scan-friendly table for visit history.
 *
 * @param {Array} visits - Visits with clinician and patient embedded
 */
export default function VisitsTable({ visits }) {
  const hasVisits = visits?.length > 0;

  return (
    <TableContainer>
      <Table size="small" sx={{ minWidth: 520 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Date & Time</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Clinician</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Patient</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hasVisits ? (
            visits.map((v) => (
              <TableRow key={v.id} hover>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {new Date(v.visited_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  {v.clinician
                    ? `${v.clinician.first_name} ${v.clinician.last_name}`
                    : '—'}
                </TableCell>
                <TableCell>
                  {v.patient
                    ? `${v.patient.first_name} ${v.patient.last_name}`
                    : '—'}
                </TableCell>
                <TableCell sx={{ maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {v.notes || '—'}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 2, color: 'text.secondary' }}>
                No visits recorded yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
