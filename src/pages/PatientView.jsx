import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/client';
import { Container, Paper, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';
export default function PatientView(){
  const { id } = useParams();
  const [patient,setPatient]=useState(null);
  const [records,setRecords]=useState([]);
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [files,setFiles]=useState(null);
  useEffect(()=>{ if(id){ API.get('/patients/'+id).then(r=>setPatient(r.data)).catch(()=>{}); API.get('/records/patient/'+id).then(r=>setRecords(r.data)).catch(()=>{}); } },[id]);
  const uploadRecord = async ()=>{
    try{
      const fd = new FormData();
      fd.append('patientId', id);
      fd.append('title', title);
      fd.append('description', description);
      if(files){ for(const f of files) fd.append('files', f); }
      await API.post('/records', fd, { headers: {'Content-Type':'multipart/form-data'} });
      alert('Record uploaded'); window.location.reload();
    }catch(e){ alert(e.response?.data?.error || 'upload failed'); }
  };
  return (
    <Container maxWidth='md' sx={{mt:4}}>
      <Paper sx={{p:3}}>
        <Typography variant='h5'>Patient</Typography>
        {patient ? (
          <div>
            <Typography variant='h6'>{patient.user?.name} — {patient.user?.email}</Typography>
            <Typography>Contact: {patient.contact}</Typography>
            <Typography sx={{mt:2}} variant='h6'>Records</Typography>
            <List>
              {records.map(r=>(<ListItem key={r._id}><ListItemText primary={r.title} secondary={r.description} /></ListItem>))}
            </List>
            <Typography sx={{mt:2}} variant='h6'>Add Record</Typography>
            <TextField label='Title' value={title} onChange={e=>setTitle(e.target.value)} fullWidth sx={{mt:1}}/>
            <TextField label='Description' value={description} onChange={e=>setDescription(e.target.value)} fullWidth sx={{mt:1}} multiline rows={3}/>
            <input type='file' multiple onChange={e=>setFiles(e.target.files)} style={{marginTop:12}} />
            <div style={{marginTop:12}}><Button variant='contained' onClick={uploadRecord}>Upload Record</Button></div>
          </div>
        ) : <p>Loading...</p>}
      </Paper>
    </Container>
  );
}
