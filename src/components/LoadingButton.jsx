import React from 'react';
import { Button, CircularProgress, Box } from '@mui/material';

export default function LoadingButton({
  loading = false,
  children,
  disabled = false,
  ...props
}) {
  return (
    <Button
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CircularProgress size={20} color="inherit" />
          <span>{typeof children === 'string' ? children : 'Loading...'}</span>
        </Box>
      ) : (
        children
      )}
    </Button>
  );
}
