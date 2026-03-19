import { Box } from '@mui/material';

/**
 * Layout container for filter controls.
 * Arranges filters in a row with consistent spacing, wrapping on smaller screens.
 *
 * @param {React.ReactNode} [children] - Filter inputs/controls
 */
export default function FilterBar({ children, ...props }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '16px',
        mb: 3,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
