import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { useAuth } from '../features/auth/AuthContext';

const navItems = [
  { path: '/clinicians', label: 'Clinicians' },
  { path: '/patients', label: 'Patients' },
  { path: '/visits', label: 'Visits' },
];

export function Layout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/clinicians" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Patient Visit Tracker
          </Typography>
          {navItems.map(({ path, label }) => (
            <Button key={path} color="inherit" component={Link} to={path}>
              {label}
            </Button>
          ))}
          {user && (
            <>
              <Typography variant="body2" sx={{ mr: 1 }}>
                {user.email}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
