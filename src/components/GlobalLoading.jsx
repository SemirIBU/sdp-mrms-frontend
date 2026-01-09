import React, { useEffect, useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

export default function GlobalLoading() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handler = (e) => {
      const detail = e.detail || {};
      if (typeof detail.count === 'number') {
        setCount(detail.count);
      } else if (typeof detail.active === 'boolean') {
        setCount(detail.active ? 1 : 0);
      }
    };
    window.addEventListener('global-loading', handler);
    return () => window.removeEventListener('global-loading', handler);
  }, []);

  const open = count > 0;
  return (
    <Backdrop open={open} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
