import { Box } from '@mui/material';

/**
 * Container for form submit/cancel buttons with consistent alignment.
 * Use at the bottom of forms for primary/secondary actions.
 *
 * @param {React.ReactNode} [children] - Typically Button components
 */
export default function FormActions({ children, ...props }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 2,
        mt: 3,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
