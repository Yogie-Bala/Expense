// components/Layout.js
import React from 'react';
import Sidebar from './sideBar';
import Header from './header';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', background: 'transparent' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Box sx={{ mt: '120px', ml: '280px', p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
