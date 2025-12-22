import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import API from '../api/client';
import { getName, getRole } from '../utils/auth';
import toast from 'react-hot-toast';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // For now, we'll use the stored info, but ideally fetch from backend
      setUser({
        name: getName(),
        role: getRole(),
        email: '' // We don't store email, but could fetch
      });
      setForm({
        name: getName(),
        email: ''
      });
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // In a real app, you'd call an API to update the profile
      // For now, just update localStorage
      localStorage.setItem('name', form.name);
      setUser({ ...user, name: form.name });
      setEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setForm({ name: user.name, email: user.email });
    setEditing(false);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Container maxWidth="md">
          <Typography>Loading...</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mb: 3, color: '#1976d2' }}>
          My Profile
        </Typography>

        <Paper sx={{ p: 4, boxShadow: 2, bgcolor: 'white' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: '#1976d2'
                }}
              >
                <AccountCircle sx={{ fontSize: 60 }} />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                {user.role}
              </Typography>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Personal Information
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={!editing}
                  fullWidth
                />

                <TextField
                  label="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={!editing}
                  fullWidth
                  type="email"
                />

                <TextField
                  label="Role"
                  value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  disabled
                  fullWidth
                />

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  {!editing ? (
                    <Button
                      variant="contained"
                      onClick={() => setEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}