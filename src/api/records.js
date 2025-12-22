import API from './client';

export const fetchRecords = () => API.get('/records');
export const createRecord = data =>
  API.post('/records', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
