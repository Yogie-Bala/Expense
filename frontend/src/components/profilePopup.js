import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Grid,
  Avatar,
  Paper,
  IconButton,
  Tab,
  Tabs,
  Button
} from '@mui/material';
import {
  Email, Phone, LocationOn, Person, Close, AccountBalance
} from '@mui/icons-material';
import API from '../utilis/api';

const InfoItem = ({ icon, label, value }) => (
  <Box display="flex" alignItems="center" gap={1} mb={2}>
    <Box color="primary.main">{icon}</Box>
    <Box>
      <Typography variant="caption" color="textSecondary">{label}</Typography>
      <Typography variant="body2">{value || '-'}</Typography>
    </Box>
  </Box>
);

const ProfilePopup = ({ onClose }) => {
  const [tab, setTab] = useState(0);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await API.get('user/getUserProfileDetails?type=User');
      const [user] = response.data || [];
      setUserDetails(user);
    } catch (error) {
      console.error("User Information failed", error);
    }
  };

  if (!userDetails) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        p: { xs: 2, sm: 3 },             // less padding on xs
        position: 'relative',
        width: { xs: '80vw', sm: 500 }, // full width on mobile, fixed width on desktop
        maxWidth: 500,
        background: 'linear-gradient(to bottom right, #fff, #f9f9f9)'
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar 
            sx={{ 
              bgcolor: '#2196f3', 
              width: { xs: 40, sm: 56 },    // smaller avatar on mobile
              height: { xs: 40, sm: 56 } 
            }}
          >
            {userDetails.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography 
              variant="h6" 
              fontWeight="bold"
              sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}  // smaller on mobile
            >
              {userDetails.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
              {userDetails.type}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ padding: { xs: 0.5, sm: 1 } }}>
          <Close fontSize={tab === 0 ? 'small' : 'medium'} />
        </IconButton>
      </Box>

      {/* Tabs */}
      <Box mt={1}>
        <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} variant="fullWidth" >
          <Tab icon={<Person />} label="Personal Information" />
          {/* <Tab icon={<AccountBalance />} label="Bank Details" /> */}
        </Tabs>
        <Divider sx={{ my: 1 }} />
      </Box>

      {/* Personal Info */}
      {tab === 0 && (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* On mobile xs, make each item full width, stacking vertically */}
          <Grid item xs={12} sm={6}>
            <InfoItem icon={<Person />} label="Name" value={userDetails.name} />
            <InfoItem icon={<Email />} label="Email" value={userDetails.email} />
            <InfoItem icon={<LocationOn />} label="Location" value={userDetails.location} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoItem icon={<Phone />} label="DOB" value={userDetails.dob?.slice(0, 10)} />
            <InfoItem icon={<Phone />} label="Mobile" value={userDetails.mobileNo} />
            <InfoItem icon={<Person />} label="Gender" value={userDetails.gender} />
          </Grid>
        </Grid>
      )}

      {/* Bank Info Placeholder */}
      {tab === 1 && (
        <Typography mt={4} color="textSecondary">Bank Details coming soon...</Typography>
      )}

      {/* Footer */}
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button variant="outlined" onClick={onClose} sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
          Close
        </Button>
      </Box>
    </Paper>
  );
};

export default ProfilePopup;
