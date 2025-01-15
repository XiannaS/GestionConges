import React, { useState } from "react";
import {
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Snackbar,
    Alert,
} from "@mui/material";
import {
    Search as SearchIcon,
    Notifications,
    AccountCircle,
    Settings,
    Brightness4,
    Dashboard as DashboardIcon,
    People,
    ContactMail,
    Receipt,
    CalendarToday,
    ExitToApp,
    BarChart,
} from "@mui/icons-material";
import { Root, AppBarStyled, DrawerStyled, Content } from "../styles/DashboardStyles";
import { Link } from "react-router-dom";
import { useTheme } from "../styles/ThemeContext";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

// Configuration du calendrier
const locales = {
    "fr-FR": require("date-fns/locale/fr"),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

// Données factices
const events = [
    { title: "Congé de Jean", start: new Date(2023, 9, 10), end: new Date(2023, 9, 15) },
    { title: "Réunion d'équipe", start: new Date(2023, 9, 20), end: new Date(2023, 9, 20) },
];

const data = [
    { name: "Jan", congés: 10 },
    { name: "Fév", congés: 15 },
    { name: "Mar", congés: 8 },
    { name: "Avr", congés: 12 },
    { name: "Mai", congés: 7 },
];

const Dashboard = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [searchTerm, setSearchTerm] = useState("");
    const [notifications, setNotifications] = useState([
        { id: 1, message: "Congé approuvé pour Jean Dupont", read: false },
        { id: 2, message: "Nouvel employé ajouté : Marie Curie", read: false },
    ]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleLogout = () => {
        console.log("Utilisateur déconnecté");
    };

    const handleMarkAsRead = (id) => {
        setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
    };

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Root>
            {/* En-tête */}
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

            {/* Barre latérale */}
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

            {/* Contenu principal */}
            <Content>
                <Grid container spacing={3}>
                    {/* Cartes de résumé */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    <People /> 45
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Nombre d'employés
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    <ContactMail /> 12
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Congés en attente
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    <Receipt /> 5
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Certificats médicaux
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    <CalendarToday /> 3
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Événements à venir
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Graphique des congés */}
                    <Grid item xs={12} md={6}>
                        <Paper style={{ padding: "16px" }}>
                            <Typography variant="h6" gutterBottom>
                                Congés par mois
                            </Typography>
                            <RechartsBarChart width={500} height={300} data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="congés" fill="#8884d8" />
                            </RechartsBarChart>
                        </Paper>
                    </Grid>

                    {/* Calendrier */}
                    <Grid item xs={12} md={6}>
                        <Paper style={{ padding: "16px" }}>
                            <Typography variant="h6" gutterBottom>
                                Calendrier
                            </Typography>
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 500 }}
                            />
                        </Paper>
                    </Grid>

                    {/* Tableau des dernières activités */}
                    <Grid item xs={12}>
                        <Paper style={{ padding: "16px" }}>
                            <Typography variant="h6" gutterBottom>
                                Derniers congés demandés
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nom</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Statut</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Jean Dupont</TableCell>
                                            <TableCell>2023-10-01</TableCell>
                                            <TableCell>En attente</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Marie Curie</TableCell>
                                            <TableCell>2023-10-05</TableCell>
                                            <TableCell>Approuvé</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Content>

            {/* Snackbar pour les notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Root>
    );
};

export default Dashboard;