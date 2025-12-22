import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import FolderIcon from '@mui/icons-material/Folder';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { Link, useLocation } from 'react-router-dom';
import { isAdmin, isDoctor, isPatient, getRole, getName } from '../utils/auth';

export default function Nav() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const navBtn = (to, label, Icon) => (
    <Button
      key={to}
      component={Link}
      to={to}
      startIcon={<Icon />}
      color="inherit"
      sx={{
        mx: 1,
        borderBottom:
          location.pathname === to ? '2px solid #fff' : 'none',
        borderRadius: 0,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }
      }}
    >
      {label}
    </Button>
  );

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: '#b4b8bbff',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      }}
    >
      <Toolbar>
        {navBtn('/', 'Dashboard', DashboardIcon)}

        {/* ADMIN */}
        {isAdmin() && navBtn('/manage-users', 'Manage Users', PeopleIcon)}
        {isAdmin() && navBtn('/patients', 'Patients', PeopleIcon)}
        {isAdmin() && navBtn('/doctors', 'Doctors', PeopleIcon)}

        {/* ADMIN + DOCTOR + PATIENT */}
        {(isAdmin() || isDoctor() || isPatient()) &&
          navBtn('/appointments', 'Appointments', EventIcon)}

        {/* ALL */}
        {navBtn('/records', 'Records', FolderIcon)}

        <div style={{ flexGrow: 1 }} />

        <div>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mr: 1, 
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 1
              }
            }}
            onClick={handleMenu}
          >
            <Typography variant="body1" sx={{ color: 'white', mr: 1 }}>
              {getName() || 'User'}
            </Typography>
            <AccountCircle />
          </Box>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'down',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/profile" onClick={handleClose}>
              <AccountCircle sx={{ mr: 1 }} />
              My Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
