import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Stack,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import API from '../utilis/api';
import { showToast } from '../utilis/toast-Components';

const ChangePasswordPopup = ({ onClose }) => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const userName = localStorage.getItem('userNameExpense');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleClear = () => {
        setFormData({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        });

        setShowPassword({
            oldPassword: false,
            newPassword: false,
            confirmPassword: false,
        });
    };

    const handleChangePassword = async () => {
        const { oldPassword, newPassword, confirmPassword } = formData;

        if (!userName) {
            showToast('User name is missing. Please log in again.');
            return;
        }

        if (!oldPassword || !newPassword || !confirmPassword) {
            showToast('All fields are required.');
            return;
        }

        if (newPassword.length < 6) {
            showToast('New password must be at least 6 characters long.');
            return;
        }

        if (newPassword !== confirmPassword) {
            showToast('New passwords do not match.');
            return;
        }

        const payload = {
            name: userName,
            oldPassword,
            newPassword,
        };

        try {
            const response = await API.post('/password/changePassword', payload);

            if (response.data?.success) {
                showToast('Password changed successfully.');
                handleClear();
            } else {
                showToast(response.data?.message || 'Password change failed.');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            const errorMessage =
                error.response?.data?.message ||
                'Failed to change password. Please check your old password and try again.';
            showToast(errorMessage);
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                width: { xs: '80vw', sm: 400 }, // mobile: 90% viewport width, desktop fixed 400px
                p: { xs: 2, sm: 4 },            // smaller padding on mobile
                borderRadius: 2,
            }}
        >
            <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                Change Password
            </Typography>

            <Stack spacing={2}>
                <TextField
                    label="User Name"
                    value={userName}
                    fullWidth
                    disabled
                    sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                />

                <TextField
                    label="Old Password"
                    name="oldPassword"
                    type={showPassword.oldPassword ? 'text' : 'password'}
                    value={formData.oldPassword}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => togglePasswordVisibility('oldPassword')}>
                                    {showPassword.oldPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    label="New Password"
                    name="newPassword"
                    type={showPassword.newPassword ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => togglePasswordVisibility('newPassword')}>
                                    {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    label="Confirm New Password"
                    name="confirmPassword"
                    type={showPassword.confirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => togglePasswordVisibility('confirmPassword')}>
                                    {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    mt={2}
                    gap={1}
                >
                    <Button
                        variant="contained"
                        onClick={handleChangePassword}
                        sx={{
                            backgroundColor: '#8bc34a',
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                            width: { xs: '100%', sm: 'auto' },
                        }}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="text"
                        sx={{ color: '#1976d2', fontSize: { xs: '0.875rem', sm: '1rem' }, width: { xs: '100%', sm: 'auto' } }}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </Box>
            </Stack>
        </Paper>
    );
};

export default ChangePasswordPopup;
