// layout/MainLayout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../../components/sideBar';
import Header from '../../components/header';
import ProfilePopup from '../../components/profilePopup';
import ChangePasswordPopup from '../../components/changePasswordPopup';

const MinimalLayout = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box sx={{ display: 'flex', background: 'rgb(238, 242, 246)', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flex: 1 }}>
        {/* Pass function to open profile popup */}
        <Header onShowProfile={() => setShowProfile(true)} onShowPassword={() => setShowPassword(true)} />

        {/* Page content */}
        <Box
          sx={{
            mt: { xs: '150px', md: '120px' },
            ml: { xs: '0', md: '280px' },
            px: { xs: 2, md: 0 }, // optional horizontal padding for mobile
          }}
        >
          <Outlet />
        </Box>

        {(showProfile || showPassword) && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 1200,
              backdropFilter: 'blur(5px)',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}
            onClick={() => {
              // Optional: close popup if user clicks outside
              setShowProfile(false);
              setShowPassword(false);
            }}
          />
        )}

        {/* Profile Popup */}
        {showProfile && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 1200,
              backdropFilter: 'blur(5px)',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setShowProfile(false)} // close on background click
          >
            <Box
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside the popup
              sx={{
                zIndex: 1300,
                borderRadius: 2,
                boxShadow: 3,
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
            >
              <ProfilePopup onClose={() => setShowProfile(false)} />
            </Box>
          </Box>
        )}

        {/* Change Password Popup */}
        {showPassword && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 1200,
              backdropFilter: 'blur(5px)',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setShowPassword(false)} // close on background click
          >
            <Box
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside the popup
              sx={{
                zIndex: 1300,
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <ChangePasswordPopup onClose={() => setShowPassword(false)} />
            </Box>
          </Box>
        )}

      </Box>
    </Box>
  );
};

export default MinimalLayout;
