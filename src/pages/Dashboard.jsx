import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import { BarChart, PieChart, LineChart } from '@mui/x-charts';
import { Link } from 'react-router-dom';
import API from '../api/client';
import { isAdmin, isDoctor, isPatient } from '../utils/auth';

const StatCard = ({ title, value }) => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h6" color="text.secondary">
      {title}
    </Typography>
    <Typography variant="h4">{value}</Typography>
  </Paper>
);

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (isAdmin()) {
      API.get('/dashboard').then((res) => setData(res.data));
    } else {
      // For doctors and patients, fetch their appointments and records
      API.get('/appointments/my').then((res) => setAppointments(res.data));
      API.get('/records').then((res) => setRecords(res.data));
    }
  }, []);

  const upcomingAppointments = appointments.filter(a => new Date(a.slot) > new Date() && a.status !== 'cancelled');
  const recentRecords = records.slice(0, 5);

  if (isAdmin() && !data) return <Typography>Loading...</Typography>;
  if (!isAdmin() && !appointments) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3, color: '#1976d2' }}>
          {isAdmin() ? 'System Overview' : isDoctor() ? 'Doctor Dashboard' : 'Patient Dashboard'}
        </Typography>

        {isAdmin() && data && (
          <>
            {/* KPI CARDS */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 3, boxShadow: 2, bgcolor: 'white' }}>
                  <Typography variant="h6" color="text.secondary">
                    Doctors
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {data.doctors}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 3, boxShadow: 2, bgcolor: 'white' }}>
                  <Typography variant="h6" color="text.secondary">
                    Patients
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {data.patients}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 3, boxShadow: 2, bgcolor: 'white' }}>
                  <Typography variant="h6" color="text.secondary">
                    Records
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {data.records}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 3, boxShadow: 2, bgcolor: 'white' }}>
                  <Typography variant="h6" color="text.secondary">
                    Appointments
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {data.appointments}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* CHARTS */}
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, boxShadow: 2, bgcolor: 'white' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Appointments per Month
                  </Typography>
                  <BarChart
                    xAxis={[
                      {
                        scaleType: 'band',
                        data: data.appointmentsPerMonth.map((m) => m.month)
                      }
                    ]}
                    series={[
                      { data: data.appointmentsPerMonth.map((m) => m.value) }
                    ]}
                    height={300}
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, boxShadow: 2, bgcolor: 'white' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Records by Type
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: data.recordsByType
                      }
                    ]}
                    height={300}
                  />
                </Paper>
              </Grid>
            </Grid>

            {/* LINE CHART */}
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Paper sx={{ p: 3, boxShadow: 2, bgcolor: 'white' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    System Growth
                  </Typography>
                  <LineChart
                    xAxis={[{ data: ['Jan', 'Feb', 'Mar'] }]}
                    series={[{ data: [5, 9, 15] }]}
                    height={300}
                  />
                </Paper>
              </Grid>
            </Grid>

            {/* Quick Actions for Admin */}
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, boxShadow: 2, bgcolor: 'white' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Manage Users
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Add, edit, or deactivate user accounts.
                  </Typography>
                  <Button variant="contained" component={Link} to="/manage-users">
                    Manage Users
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, boxShadow: 2, bgcolor: 'white' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    View Patients
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    See all patient records and details.
                  </Typography>
                  <Button variant="outlined" component={Link} to="/patients">
                    View Patients
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, boxShadow: 2, bgcolor: 'white' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    System Reports
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Generate and view system reports.
                  </Typography>
                  <Button variant="outlined" disabled>
                    Coming Soon
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}

        {(isDoctor() || isPatient()) && (
          <>
            {/* Upcoming Appointments */}
            <Paper sx={{ p: 3, boxShadow: 2, bgcolor: 'white', mb: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#1976d2' }}>
                Upcoming Appointments
              </Typography>
              {upcomingAppointments.length === 0 ? (
                <Typography>No upcoming appointments.</Typography>
              ) : (
                <List>
                  {upcomingAppointments.slice(0, 5).map((a) => (
                    <ListItem key={a._id} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      <ListItemText
                        primary={`${new Date(a.slot).toLocaleString()} - ${isDoctor() ? `Patient: ${a.patient?.user?.name || 'Unknown'}` : `Dr. ${a.doctor?.user?.name || 'Unknown'}`}`}
                        secondary={`Status: ${a.status}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
              {upcomingAppointments.length > 5 && (
                <Typography variant="body2" color="text.secondary">
                  And {upcomingAppointments.length - 5} more...
                </Typography>
              )}
            </Paper>

            {/* Recent Records */}
            <Paper sx={{ p: 3, boxShadow: 2, bgcolor: 'white', mb: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#1976d2' }}>
                Recent Medical Records
              </Typography>
              {recentRecords.length === 0 ? (
                <Typography>No recent records.</Typography>
              ) : (
                <List>
                  {recentRecords.map((r) => (
                    <ListItem key={r._id} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      <ListItemText
                        primary={`${r.title} - ${new Date(r.createdAt).toLocaleDateString()}`}
                        secondary={`Patient: ${r.patient?.user?.name || 'Unknown'} | Doctor: ${r.doctor?.user?.name || 'Unknown'}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>

            {/* Quick Actions */}
            <Grid container spacing={3}>
              {isPatient() && (
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, boxShadow: 2, bgcolor: 'white' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Book New Appointment
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Schedule an appointment with one of our doctors.
                    </Typography>
                    <Button variant="contained" component={Link} to="/appointments">
                      Book Appointment
                    </Button>
                  </Paper>
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, boxShadow: 2, bgcolor: 'white' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    View All Appointments
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    See all your appointments and manage them.
                  </Typography>
                  <Button variant="outlined" component={Link} to="/appointments">
                    View Appointments
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, boxShadow: 2, bgcolor: 'white' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Medical Records
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Access your medical history and records.
                  </Typography>
                  <Button variant="outlined" component={Link} to="/records">
                    View Records
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}
