import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Link
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import API from '../api/client';
import { useState, useEffect } from 'react';
import { isAuthenticated } from '../utils/auth';
import LoadingButton from '../components/LoadingButton';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) navigate('/');
  }, [navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user?.role || '');
      localStorage.setItem('name', res.data.user?.name || '');
      window.location.href = '/';
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: (theme) => theme.palette.custom.pageBackground
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            MRMS
          </Typography>
          <Typography align="center" color="text.secondary">
            Medical Records Management System
          </Typography>

          <Box component="form" onSubmit={submit} sx={{ mt: 3 }}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoadingButton type="submit" variant="contained" fullWidth sx={{ mt: 2 }} loading={loading}>
              Sign In
            </LoadingButton>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link component={RouterLink} to="/forgot-password">
                Forgot Password?
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
