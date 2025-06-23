import React from 'react';
import {
    Typography,
    Box,
    InputBase,
    IconButton,
    Paper,
    useMediaQuery,
    Breadcrumbs,
    Link
} from '@mui/material';
import { Search, Settings, Notifications, Home } from '@mui/icons-material';
import UserProfilePopup from './userProfile';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Header = ({ onShowProfile, onShowPassword }) => {
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [searchValue, setSearchValue] = React.useState('');
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const navigate = useNavigate();

    const pages = ['home', 'income', 'expense', 'userInfo', 'report', 'calender'];

    const filteredSuggestions = pages.filter(
        (page) =>
            page.toLowerCase().includes(searchValue.toLowerCase()) &&
            searchValue.trim()
    );

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            navigate(`/pages/${encodeURIComponent(searchValue.trim())}`);
            setShowSuggestions(false);
        }
    };

    const handleSelectSuggestion = (value) => {
        setSearchValue('');
        setShowSuggestions(false);
        navigate(`/pages/${encodeURIComponent(value)}`);
    };

    const pathToTitle = {
        '/pages/home': 'Dashboard',
        '/pages/userInfo': 'User Info',
        '/pages/expense': 'Expense',
        '/pages/income': 'Income',
        '/pages/report': 'Report',
        '/pages/calender': 'Calender'
    };

    const pageTitle = pathToTitle[location.pathname] || 'Dashboard';

    return (
        <Paper
            elevation={3}
            sx={{
                width: isMobile ? '100%' : '78%',
                borderRadius: isMobile ? 0 : '20px',
                my: isMobile ? 0 : 2,
                px: isMobile ? 2 : 3,
                py: 1.5,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                position: 'fixed',
                marginLeft: isMobile ? 0 : '280px',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: isMobile ? 'flex-start' : 'space-between',
                background: 'linear-gradient(to right, #dbeafe, #d1fae5)',
                zIndex: 1100,
                gap: isMobile ? 1 : 0,
            }}
        >
            {isMobile && (
                <Box sx={{ width: '100%', display: 'flex', marginLeft: '-25px', marginTop: '-5px', justifyContent: 'space-between' }}>
                    <Box />
                    <UserProfilePopup
                        onShowProfile={onShowProfile}
                        onShowPassword={onShowPassword}
                    />
                </Box>
            )}

            {isMobile ? (
                <Typography variant="h6" fontWeight="bold" sx={{ marginTop: '-20px' }}>
                    {pageTitle}
                </Typography>
            ) : (
                <Box sx={{ width: '100%', textAlign: 'left', mt: isMobile ? -2 : 0 }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                            Home
                        </Link>
                        <Typography color="text.primary">{pageTitle}</Typography>
                    </Breadcrumbs>
                    <Typography variant="h6" fontWeight="bold">
                        {pageTitle}
                    </Typography>
                </Box>
            )}

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 1.5,
                    width: isMobile ? '100%' : 'auto',
                    ml: isMobile ? -2 : 0,
                    mt: isMobile ? -0.5 : 0,
                    pl: isMobile ? 1 : 0,
                    position: 'relative'
                }}
            >
                <Paper
                    component="form"
                    onSubmit={handleSearchSubmit}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: isMobile ? 130 : 200,
                        mr: isMobile ? 0 : '20px',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        bgcolor: 'white',
                        position: 'relative'
                    }}
                    elevation={0}
                >
                    <Search sx={{ color: '#888' }} />
                    <InputBase
                        placeholder="Search here"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        sx={{ ml: 1, flex: 1, color: '#666' }}
                    />

                    {showSuggestions && filteredSuggestions.length > 0 && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                width: '100%',
                                bgcolor: 'white',
                                boxShadow: 1,
                                zIndex: 1200,
                                borderRadius: 1,
                                mt: 1
                            }}
                        >
                            {filteredSuggestions.map((suggestion, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        cursor: 'pointer',
                                        '&:hover': { backgroundColor: '#f0f0f0' },
                                    }}
                                    onClick={() => handleSelectSuggestion(suggestion)}
                                >
                                    {suggestion}
                                </Box>
                            ))}
                        </Box>
                    )}
                </Paper>

                {!isMobile && (
                    <>
                        <UserProfilePopup
                            onShowProfile={onShowProfile}
                            onShowPassword={onShowPassword}
                        />
                        <IconButton><Settings /></IconButton>
                        <IconButton><Notifications /></IconButton>
                    </>
                )}
            </Box>
        </Paper>
    );
};

export default Header;
