import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';

const TopBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications] = useState(3); // Example notification count

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileOptionClick = (option) => {
        console.log(option);
        handleMenuClose();
    };

    const isMenuOpen = Boolean(anchorEl);

    return (
        <AppBar >
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Dashboard
                </Typography>
                <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                    <AccountCircle />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => handleProfileOptionClick('Profile')}>Profile</MenuItem>
                    <MenuItem onClick={() => handleProfileOptionClick('Settings')}>Settings</MenuItem>
                    <MenuItem onClick={() => handleProfileOptionClick('Logout')}>Logout</MenuItem>
                </Menu>
                <IconButton color="inherit">
                    <Badge badgeContent={notifications} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;