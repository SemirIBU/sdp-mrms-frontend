import API from './client';

export const fetchPatients = () => API.get('/patients');
