import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRouteRegister = () => {
    navigate('/pages/signUp');
  }

  const handleLogin = async (name, password) => {
    try {
      const response = await API.post('http://localhost:8000/auth/logIn', {
        name,
        password
      });

      const { token, user } = response.data;

      console.log('Login Successful:', user);
      localStorage.setItem('authToken', token);
      localStorage.setItem('userNameExpense', name);
      showToast('success', 'Login successfully!');
      navigate('/pages/home')
    } catch (error) {
      console.error('Login Failed:', error.response?.data || error.message);
      showToast('error', 'Login failed!');
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
            Login
          </Typography>
          <Typography variant="body2" mb={3}>
            Welcome back to Expense Tracker
          </Typography>

          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <FormControlLabel control={<Checkbox />} label="Remember Me" />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, borderRadius: 5 }}
            onClick={() => handleLogin(name, password)}
          >
            Login
          </Button>

          <Typography variant="body2" mt={2}>
            Don't have an account?{' '}
            <Button size="small" variant="text" onClick={handleRouteRegister}>Register</Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
