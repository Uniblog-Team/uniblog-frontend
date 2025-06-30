import React from 'react';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        backgroundImage: 'url(/images/uniblog-home.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'fixed',
        top: 0,
        left: 0,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: alpha('#000', 0.5),
          zIndex: 1,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default AuthLayout;