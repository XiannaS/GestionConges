import React, { useState, useEffect } from "react";
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
    CircularProgress,
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
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import axios from "axios";

const Dashboard = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [statistiques, setStatistiques] = useState({
        nombreEmployes: 0,
        congesEnAttente: 0,
        certificatsMedicaux: 0,
        evenementsAVenir: 0,
    });
    const [employes, setEmployes] = useState([]);
    const [conges, setConges] = useState([]);
    const [certificats, setCertificats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    // Charger les données depuis l'API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [employesResponse, congesResponse, certificatsResponse] = await Promise.all([
                    axios.get("http://localhost:5126/api/employes"),
                    axios.get("http://localhost:5126/api/conges"),
                    axios.get("http://localhost:5126/api/CertificatMedical"),
                ]);

                // Accéder aux données
                const employes = employesResponse.data.$values || [];
                const conges = congesResponse.data.$values || [];
                const certificats = certificatsResponse.data.$values || [];

                // Calculer les statistiques
                const nombreEmployes = employes.length;
                const congesEnAttente = conges.filter(c => c.statut === "En attente").length;
                const certificatsMedicaux = certificats.length;
                const evenementsAVenir = conges.filter(c => new Date(c.dateDebut) > new Date()).length;

                setStatistiques({
                    nombreEmployes,
                    congesEnAttente,
                    certificatsMedicaux,
                    evenementsAVenir,
                });

                setEmployes(employes);
                setConges(conges);
                setCertificats(certificats);
            } catch (error) {
                if (error.response) {
                    console.error("Erreur de réponse du serveur :", error.response.data);
                    showSnackbar(`Erreur ${error.response.status}: ${error.response.data.message}`, "error");
                } else if (error.request) {
                    console.error("Pas de réponse du serveur :", error.request);
                    showSnackbar("Le serveur ne répond pas. Veuillez réessayer plus tard.", "error");
                } else {
                    console.error("Erreur lors de la configuration de la requête :", error.message);
                    showSnackbar("Une erreur inattendue est survenue.", "error");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Afficher un Snackbar
    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    // Fermer le Snackbar
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Afficher un indicateur de chargement pendant la récupération des données
    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <Root>
            {/* En-tête */}
            <AppBarStyled position="fixed" style={{ backgroundColor: darkMode ? '#424242' : 'transparent' }}>
                <div style={{ display: "flex", alignItems: "center", marginLeft: 16 }}>
                    <Typography variant="h6" style={{ color: darkMode ? 'white' : 'black' }}>
                        ADMINIS
                    </Typography>
                </div>

                {/* Barre de recherche centrée */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Paper
                        component="form"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            width: 400,
                            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                            borderRadius: 8,
                            padding: '2px 4px',
                        }}
                    >
                        <InputBase
                            placeholder="Rechercher..."
                            startAdornment={<SearchIcon style={{ color: darkMode ? 'white' : 'black', margin: '0 8px' }} />}
                            style={{ flex: 1, color: darkMode ? 'white' : 'black' }}
                        />
                    </Paper>
                </div>

                {/* Icônes à droite */}
                <div style={{ display: "flex", alignItems: "center", marginRight: 16 }}>
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
                    <IconButton color="inherit" aria-label="logout" onClick={() => console.log("Déconnexion")}>
                        <ExitToApp style={{ color: darkMode ? 'white' : 'black' }} />
                    </IconButton>
                </div>
            </AppBarStyled>

            {/* Barre latérale */}
            <DrawerStyled
                variant="permanent"
                PaperProps={{ style: { backgroundColor: darkMode ? '#333' : '#fff' } }}
            >
                <List>
                    <ListItem style={{ marginBottom: 24 }}>
                        <ListItemText primary=" " style={{ color: darkMode ? 'white' : 'black' }} />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <AccountCircle style={{ color: darkMode ? 'white' : 'black' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="User"
                            secondary="Admin"
                            style={{ color: darkMode ? 'white' : 'black' }}
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemText primary="Data" style={{ color: darkMode ? 'white' : 'black' }} />
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
                        <ListItemText primary="Charts" style={{ color: darkMode ? 'white' : 'black' }} />
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
                        <Card style={{ backgroundColor: darkMode ? '#424242' : '#fff' }}>
                            <CardContent>
                                <Typography variant="h5" component="div" style={{ color: darkMode ? 'white' : 'black' }}>
                                    <People style={{ color: darkMode ? 'white' : 'black' }} /> {statistiques.nombreEmployes}
                                </Typography>
                                <Typography variant="body2" style={{ color: darkMode ? 'white' : 'black' }}>
                                    Nombre d'employés
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card style={{ backgroundColor: darkMode ? '#424242' : '#fff' }}>
                            <CardContent>
                                <Typography variant="h5" component="div" style={{ color: darkMode ? 'white' : 'black' }}>
                                    <ContactMail style={{ color: darkMode ? 'white' : 'black' }} /> {statistiques.congesEnAttente}
                                </Typography>
                                <Typography variant="body2" style={{ color: darkMode ? 'white' : 'black' }}>
                                    Congés en attente
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card style={{ backgroundColor: darkMode ? '#424242' : '#fff' }}>
                            <CardContent>
                                <Typography variant="h5" component="div" style={{ color: darkMode ? 'white' : 'black' }}>
                                    <Receipt style={{ color: darkMode ? 'white' : 'black' }} /> {statistiques.certificatsMedicaux}
                                </Typography>
                                <Typography variant="body2" style={{ color: darkMode ? 'white' : 'black' }}>
                                    Certificats médicaux
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card style={{ backgroundColor: darkMode ? '#424242' : '#fff' }}>
                            <CardContent>
                                <Typography variant="h5" component="div" style={{ color: darkMode ? 'white' : 'black' }}>
                                    <CalendarToday style={{ color: darkMode ? 'white' : 'black' }} /> {statistiques.evenementsAVenir}
                                </Typography>
                                <Typography variant="body2" style={{ color: darkMode ? 'white' : 'black' }}>
                                    Événements à venir
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Graphique des congés */}
                    <Grid item xs={12} md={6}>
                        <Paper style={{ padding: "16px", backgroundColor: darkMode ? '#424242' : '#fff' }}>
                            <Typography variant="h6" gutterBottom style={{ color: darkMode ? 'white' : 'black' }}>
                                Congés par mois
                            </Typography>
                            <RechartsBarChart width={500} height={300} data={conges}>
                                <XAxis dataKey="dateDebut" stroke={darkMode ? 'white' : 'black'} />
                                <YAxis stroke={darkMode ? 'white' : 'black'} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="duree" fill="#8884d8" />
                            </RechartsBarChart>
                        </Paper>
                    </Grid>

                    {/* Tableau des derniers congés */}
                    <Grid item xs={12}>
                        <Paper style={{ padding: "16px", backgroundColor: darkMode ? '#424242' : '#fff' }}>
                            <Typography variant="h6" gutterBottom style={{ color: darkMode ? 'white' : 'black' }}>
                                Derniers congés demandés
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ color: darkMode ? 'white' : 'black' }}>Nom</TableCell>
                                            <TableCell style={{ color: darkMode ? 'white' : 'black' }}>Date de début</TableCell>
                                            <TableCell style={{ color: darkMode ? 'white' : 'black' }}>Date de fin</TableCell>
                                            <TableCell style={{ color: darkMode ? 'white' : 'black' }}>Statut</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {conges.map((conge) => (
                                            <TableRow key={conge.id}>
                                                <TableCell style={{ color: darkMode ? 'white' : 'black' }}>
                                                    {conge.employe?.nom} {conge.employe?.prenom}
                                                </TableCell>
                                                <TableCell style={{ color: darkMode ? 'white' : 'black' }}>
                                                    {new Date(conge.dateDebut).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell style={{ color: darkMode ? 'white' : 'black' }}>
                                                    {new Date(conge.dateFin).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell style={{ color: darkMode ? 'white' : 'black' }}>
                                                    {conge.statut || "Non spécifié"}
                                                </TableCell>
                                            </TableRow>
                                        ))}
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