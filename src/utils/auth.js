export const getRole = () => localStorage.getItem('role');
export const getName = () => localStorage.getItem('name');

export const isAdmin = () => getRole() === 'admin';
export const isDoctor = () => getRole() === 'doctor';
export const isPatient = () => getRole() === 'patient';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch (e) {
    return false;
  }
};