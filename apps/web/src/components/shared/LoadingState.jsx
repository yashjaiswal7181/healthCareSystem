import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * Centered loading indicator with optional message.
 *
 * @param {string} [message] - Optional loading message
 */
export default function LoadingState({ message }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        gap: 2,
      }}
    >
      <CircularProgress size={40} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
}
