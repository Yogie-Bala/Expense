import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
  Divider,
  Drawer,
  IconButton,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard,
  GTranslate,
  Menu as MenuIcon,
  Notifications,
  Receipt,
  TableChart
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { icon: <Dashboard />, label: 'Home', path: '/pages/home' },
    { icon: <TableChart />, label: 'User Info', path: '/pages/userInfo' },
    { icon: <Receipt />, label: 'Expense', path: '/pages/expense' },
    { icon: <GTranslate />, label: 'Income', path: '/pages/income' },
    { icon: <Notifications />, label: 'Calender', path: '/pages/calender' },
    { icon: <Notifications />, label: 'Report', path: '/pages/report' }
  ];

  const drawerContent = (
    <Box
      sx={{
        // width: 200,
        width: {
          xs: 168, // mobile = stacked
          sm: 200,    // laptop = side-by-side
        },
        height: '100%',
        background: 'linear-gradient(to bottom, #2c2c2c, #1a1a1a)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <Dashboard sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">
          Expense Tracker
        </Typography>
      </Box>

      <Divider sx={{ width: '100%', borderColor: '#444' }} />

      <List sx={{ width: '100%' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              button
              key={item.label}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false); // Close drawer on mobile after click
              }}
              sx={{
                my: 0.5,
                borderRadius: 1,
                bgcolor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? '#fff' : '#ccc',
                '&:hover': {
                  bgcolor: isActive ? 'primary.dark' : 'primary.light',
                },
              }}
            >
              <ListItemIcon sx={{ color: isActive ? '#fff' : '#ccc' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          );
        })}
      </List>

      {/* <Box mt="auto" width="100%">
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: 'primary.main',
            mt: 2,
            borderRadius: 2,
            fontWeight: 'bold',
            py: 1.5,
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          UPGRADE TO PRO
        </Button>
      </Box> */}
    </Box>
  );

  return (
    <>
      {/* Mobile hamburger menu */}
      {isMobile && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: 'fixed',
            top: 10,
            left: 10,
            zIndex: 1300,
            color: '#fff',
            bgcolor: '#333',
            '&:hover': { bgcolor: '#555' },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar for desktop */}
      {!isMobile && (
        <Box
          sx={{
            width: 200,
            height: '90vh',
            background: 'linear-gradient(to bottom, #2c2c2c, #1a1a1a)',
            color: '#fff',
            display: 'flex',
            position: 'fixed',
            marginTop: '20px',
            marginLeft: '20px',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
            borderRadius: 2,
          }}
        >
          {drawerContent}
        </Box>
      )}

      {/* Drawer for mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 200,
            bgcolor: '#1a1a1a',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
