import { Card, CardContent, Typography } from '@mui/material';

/**
 * Wrapper for forms and content areas.
 * Provides consistent card styling with padding and optional title.
 *
 * @param {string} [title] - Optional section title
 * @param {React.ReactNode} [children] - Card content
 */
export default function SectionCard({ title, children, ...props }) {
  return (
    <Card variant="outlined" sx={{ overflow: 'visible' }} {...props}>
      <CardContent sx={{ p: 2 }}>
        {title && (
          <Typography
            variant="subtitle1"
            component="h2"
            fontWeight={600}
            sx={{ mb: 3 }}
            color="text.secondary"
          >
            {title}
          </Typography>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
