// UserProfilePopup.jsx
import React, { useState } from 'react';
import {
    Avatar, Badge, Box, Divider, IconButton, List, ListItem, ListItemIcon,
    ListItemText, Popover, Typography
} from '@mui/material';
import { AccountCircle, Lock, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const UserProfilePopup = ({ onShowProfile, onShowPassword }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState([]);
    const [userName, setUserName] = useState(localStorage.getItem('userNameExpense'));
    const [type, setType] = useState(localStorage.getItem('type'));
    const navigate = useNavigate();

    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const userInitial = user.name?.charAt(0)?.toUpperCase() || '';

    const handleLogout = async () => {
        localStorage.clear();
        navigate('/pages/login');
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <Badge
                    overlap="circular"
                    color="success"
                    variant="dot"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    {/* <Avatar>{userInitial}</Avatar> */}
                    <Avatar src="/assets/user.jpg" />
                </Badge>
            </IconButton>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 2,
                        borderRadius: 3,
                        width: { xs: 220, sm: 280 }  // smaller width on xs (mobile), normal on sm+
                    }
                }}
            >
                <Box textAlign="center" mb={2}>
                    <Avatar
                        sx={{
                            width: { xs: 40, sm: 56 },  // smaller avatar on xs
                            height: { xs: 40, sm: 56 },
                            mx: 'auto',
                            mb: 1
                        }}
                    >
                        {userInitial}
                    </Avatar>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}  // smaller font on xs
                    >
                        {userName}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}  // smaller on xs
                    >
                        {type}
                    </Typography>
                    <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
                        <Typography
                            variant="body2"
                            sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
                        >
                            {user.email}
                        </Typography>
                    </Box>
                </Box>

                <Divider />

                <List sx={{ px: { xs: 1, sm: 0 } }}>
                    <ListItem
                        button
                        sx={{ cursor: 'pointer', py: { xs: 0.5, sm: 1 } }}
                        onClick={() => {
                            handleClose();
                            onShowProfile();
                        }}
                    >
                        <ListItemIcon>
                            <AccountCircle color="primary" sx={{ fontSize: { xs: 20, sm: 24 } }} />
                        </ListItemIcon>
                        <ListItemText primary="My Profile" primaryTypographyProps={{ fontSize: { xs: '0.85rem', sm: '1rem' } }} />
                    </ListItem>
                    <ListItem
                        button
                        sx={{ cursor: 'pointer', py: { xs: 0.5, sm: 1 } }}
                        onClick={() => {
                            handleClose();
                            onShowPassword();
                        }}
                    >
                        <ListItemIcon>
                            <Lock sx={{ fontSize: { xs: 20, sm: 24 } }} />
                        </ListItemIcon>
                        <ListItemText primary="Change Password" primaryTypographyProps={{ fontSize: { xs: '0.85rem', sm: '1rem' } }} />
                    </ListItem>
                    <ListItem button onClick={handleLogout} sx={{ cursor: 'pointer', py: { xs: 0.5, sm: 1 } }}>
                        <ListItemIcon>
                            <Logout sx={{ fontSize: { xs: 20, sm: 24 } }} />
                        </ListItemIcon>
                        <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: { xs: '0.85rem', sm: '1rem' } }} />
                    </ListItem>
                </List>
            </Popover>
        </>
    );
};

export default UserProfilePopup;
