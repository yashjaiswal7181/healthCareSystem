import { Box, Typography } from '@mui/material';

/**
 * Page header with title, optional subtitle, and action area.
 * Use for consistent page titles across the app.
 *
 * @param {string} title - Main page title
 * @param {string} [subtitle] - Optional subtitle or description
 * @param {React.ReactNode} [actions] - Optional action buttons/controls (rendered on the right)
 */
export default function PageHeader({ title, subtitle, actions }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 2,
        mb: 2,
      }}
    >
      <Box>
        <Typography variant="h4" component="h1" fontWeight={600}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {actions && <Box sx={{ flexShrink: 0 }}>{actions}</Box>}
    </Box>
  );
}
