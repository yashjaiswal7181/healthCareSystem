import { Box, Typography, Button } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

/**
 * Displays a no-data state with icon, message, and optional action.
 *
 * @param {string} [message='No data to display'] - Main message
 * @param {string} [description] - Optional secondary description
 * @param {React.ReactNode} [action] - Optional action (e.g. Button)
 * @param {React.ReactNode} [icon] - Optional custom icon (default: inbox icon)
 */
export default function EmptyState({
  message = 'No data to display',
  description,
  action,
  icon,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        px: 2,
        textAlign: 'center',
      }}
    >
      <Box sx={{ color: 'action.disabled', mb: 2 }}>
        {icon || <InboxOutlinedIcon sx={{ fontSize: 48 }} />}
      </Box>
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 360 }}>
          {description}
        </Typography>
      )}
      {action && <Box sx={{ mt: 3 }}>{action}</Box>}
    </Box>
  );
}
