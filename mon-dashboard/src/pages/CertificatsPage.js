import React from 'react';
import { IconButton, InputBase, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Search as SearchIcon, Notifications, AccountCircle, Settings, Brightness4, Dashboard as DashboardIcon, People, ContactMail, Receipt, CalendarToday, ExitToApp, BarChart } from '@mui/icons-material';
import { Root, AppBarStyled, DrawerStyled, Content } from '../styles/DashboardStyles';
import { Link } from 'react-router-dom';
import { useTheme } from '../styles/ThemeContext'; // Importer le contexte de thème

const CertificatsPage = () => {
    const { darkMode, toggleTheme } = useTheme();

    const handleLogout = () => {
        console.log('User logged out');
    };

    return (
        <Root>
            <AppBarStyled position="fixed" style={{ backgroundColor: darkMode ? '#424242' : 'transparent' }}>
                <InputBase
                    placeholder="Rechercher..."
                    startAdornment={<SearchIcon style={{ color: darkMode ? 'white' : 'black' }} />}
                    style={{ flex: 1, marginLeft: 8, color: darkMode ? 'white' : 'black' }}
                />
                <IconButton color="inherit" aria-label="notifications">
                    <Notifications style={{ color: darkMode ? 'white' : 'black' }} />
                </IconButton>
                <IconButton color="inherit" aria-label="toggle theme" onClick={toggleTheme}>
                    <Brightness4 style={{ color: darkMode ? 'white' : 'black' }} />
                </IconButton>
                <IconButton color="inherit" aria-label="settings">
                    <Settings style={{ color: darkMode ? 'white' : 'black' }} />
                </IconButton>
                <IconButton color="inherit" aria-label="account">
                    <AccountCircle style={{ color: darkMode ? 'white' : 'black' }} />
                </IconButton>
                <IconButton color="inherit" aria-label="logout" onClick={handleLogout}>
                    <ExitToApp style={{ color: darkMode ? 'white' : 'black' }} />
                </IconButton>
            </AppBarStyled>

            <DrawerStyled
                variant="permanent"
                PaperProps={{ style: { backgroundColor: darkMode ? '#333' : '#fff' } }}
            >
                <List>
                    <ListItem>
                        <ListItemText primary="ADMINIS" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        <ListItemText primary="Ed Roh" secondary="VP Fancy Admin" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Data" />
                    </ListItem>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon>
                            <DashboardIcon style={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" style={{ color: darkMode ? 'white' : 'black' }} />
                    </ListItem>
                    <ListItem button component={Link} to="/employes">
                        <ListItemIcon>
                            <People style={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Manage Team" style={{ color: darkMode ? 'white' : 'black' }} />
                    </ListItem>
                    <ListItem button component={Link} to="/conges">
                        <ListItemIcon>
                            <ContactMail style={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Congés" style={{ color: darkMode ? 'white' : 'black' }} />
                    </ListItem>
                    <ListItem button component={Link} to="/certificats">
                        <ListItemIcon>
                            <Receipt style={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Certificats Médicaux" style={{ color: darkMode ? 'white' : 'black' }} />
                    </ListItem>
                    <ListItem button component={Link} to="/profile">
                        <ListItemIcon>
                            <AccountCircle style={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Profile Form" style={{ color: darkMode ? 'white' : 'black' }} />
                    </ListItem>
                    <ListItem button component={Link} to="/calendar">
                        <ListItemIcon>
                            <CalendarToday style={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Calendar" style={{ color: darkMode ? 'white' : 'black' }} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Charts" />
                    </ListItem>
                    <ListItem button component={Link} to="/charts">
                        <ListItemIcon>
                            <BarChart style={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText primary="Bar Chart" style={{ color: darkMode ? 'white' : 'black' }} />
                    </ListItem>
                </List>
            </DrawerStyled>

            <Content>
                <div>
                    <h1>Page de gestion des certificats médicaux</h1>
                </div>
            </Content>
        </Root>
    );
};

export default CertificatsPage;
