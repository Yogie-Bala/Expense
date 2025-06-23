import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import BackgroundDesign from './theme';
import { useNavigate } from 'react-router-dom';
import API from '../../utilis/api';
import { showToast } from '../../utilis/toast-Components';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRouteRegister = () => {
    navigate('/pages/login');
  }

  const handleSignin = async (name, email, password) => {
    try {
      const response = await API.post('auth/register', {
        name,
        email,
        password
      });

      const { user } = response.data;

      console.log('Registered Successful:', user);
      // localStorage.setItem('authToken', token);
      showToast('success', 'Registered successfully!');
      // navigate('/pages/home')
    } catch (error) {
      console.error('Register Failed:', error.response?.data || error.message);
      showToast('error', 'Register failed!');
    }
  };

  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <BackgroundDesign />

      <Container
        maxWidth="xs"
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            p: 4,
            borderRadius: 3,
            boxShadow: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            SignUp
          </Typography>
          <Typography variant="body2" mb={3}>
            Welcome back to Expense Tracker
          </Typography>

          <TextField label="Username" fullWidth margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)} />

          <TextField label="Email" fullWidth margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />

          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: 5 }} onClick={() => handleSignin(name, email, password)}>
            Create account
          </Button>

          <Typography variant="body2" mt={2}>
            already have an account?{' '}
            <Button size="small" variant="text" onClick={handleRouteRegister}>LogIn</Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;