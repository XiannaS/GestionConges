import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Card,
    CardContent,
    Grid,
    Snackbar,
    Alert,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
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
import { useTheme } from "../styles/ThemeContext"; // Importer le contexte de thème

const Conges = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [conges, setConges] = useState([]);
    const [employes, setEmployes] = useState([]); // Liste des employés pour le formulaire
    const [newConge, setNewConge] = useState({
        dateDebut: "",
        dateFin: "",
        motif: "",
        statut: "En attente",
        employeId: "", // ID de l'employé sélectionné
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    // Charger la liste des congés et des employés au montage du composant
    useEffect(() => {
        fetchConges();
        fetchEmployes();
    }, []);

    // Récupérer la liste des congés
    const fetchConges = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get("http://localhost:5126/api/conges");
            setConges(response.data.$values || []); // Utiliser $values si présent
        } catch (error) {
            console.error("Erreur lors de la récupération des congés:", error);
            setError("Erreur lors de la récupération des congés. Veuillez réessayer.");
            showSnackbar("Erreur lors de la récupération des congés.", "error");
        } finally {
            setLoading(false);
        }
    };

    // Récupérer la liste des employés
    const fetchEmployes = async () => {
        try {
            const response = await axios.get("http://localhost:5126/api/employes");
            // Accéder à $values pour obtenir le tableau d'employés
            const employesData = response.data.$values || [];
            setEmployes(employesData);
        } catch (error) {
            console.error("Erreur lors de la récupération des employés:", error);
            setError("Erreur lors de la récupération des employés. Veuillez réessayer.");
            showSnackbar("Erreur lors de la récupération des employés.", "error");
        }
    };

    // Gérer les changements dans le formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewConge({ ...newConge, [name]: value });
    };

    // Ajouter un nouveau congé

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Validation simple
        if (!newConge.dateDebut || !newConge.dateFin || !newConge.motif || !newConge.employeId) {
            setError("Tous les champs sont obligatoires.");
            showSnackbar("Tous les champs sont obligatoires.", "error");
            setLoading(false);
            return;
        }

        // Formater les dates au format ISO 8601
        const formattedConge = {
            ...newConge,
            dateDebut: new Date(newConge.dateDebut).toISOString(), // Convertir en ISO 8601
            dateFin: new Date(newConge.dateFin).toISOString(),     // Convertir en ISO 8601
        };

        console.log("Données du congé avant envoi :", formattedConge); // Log avant l'envoi

        try {
            const response = await axios.post("http://localhost:5126/api/conges", formattedConge, {
                headers: {
                    "Content-Type": "application/json", // Assurez-vous que cet en-tête est présent
                },
            });
            console.log("Réponse de l'API après ajout du congé :", response.data); // Log de la réponse

            setConges([...conges, response.data]); // Ajouter le nouveau congé à la liste
            setNewConge({
                dateDebut: "",
                dateFin: "",
                motif: "",
                statut: "En attente",
                employeId: "",
            }); // Réinitialiser le formulaire
            showSnackbar("Congé ajouté avec succès !", "success");
        } catch (error) {
            console.error("Erreur lors de l'ajout du congé:", error);
            console.error("Détails de l'erreur :", error.response ? error.response.data : "Pas de réponse"); // Log des détails de l'erreur
            setError("Erreur lors de l'ajout du congé. Veuillez vérifier les données.");
            showSnackbar("Erreur lors de l'ajout du congé.", "error");
        } finally {
            setLoading(false);
        }
    };
 
    // Afficher un Snackbar (notification)
    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    // Fermer le Snackbar
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
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
                <IconButton color="inherit" aria-label="logout">
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
                <Container>
                    <Typography variant="h3" gutterBottom>
                        Gestion des congés
                    </Typography>

                    {/* Formulaire pour ajouter un congé */}
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h5" gutterBottom>
                            Ajouter un congé
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Date de début"
                                    type="date"
                                    name="dateDebut"
                                    value={newConge.dateDebut}
                                    onChange={handleInputChange}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Date de fin"
                                    type="date"
                                    name="dateFin"
                                    value={newConge.dateFin}
                                    onChange={handleInputChange}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Motif"
                                    name="motif"
                                    value={newConge.motif}
                                    onChange={handleInputChange}
                                    placeholder="Entrez le motif"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Employé</InputLabel>
                                    <Select
                                        name="employeId"
                                        value={newConge.employeId}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <MenuItem value="">Sélectionnez un employé</MenuItem>
                                        {employes.map((employe) => (
                                            <MenuItem key={employe.id} value={employe.id}>
                                                {employe.nom} {employe.prenom} (ID: {employe.id})
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                >
                                    {loading ? "Ajout en cours..." : "Ajouter"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                    {/* Liste des congés */}
                    <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
                        Liste des congés
                    </Typography>
                    {loading ? (
                        <Typography>Chargement en cours...</Typography>
                    ) : conges.length === 0 ? (
                        <Typography>Aucun congé trouvé.</Typography>
                    ) : (
                        <Grid container spacing={3}>
                            {conges.map((conge) => {
                                const employe = employes.find((e) => e.id === conge.employeId);
                                return (
                                    <Grid item xs={12} sm={6} md={4} key={conge.id}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h6" color="primary">
                                                    Congé #{conge.id}
                                                </Typography>
                                                <Typography>
                                                    <strong>Employé :</strong>{" "}
                                                    {employe ? `${employe.nom} ${employe.prenom}` : "Inconnu"} (ID: {conge.employeId})
                                                </Typography>
                                                <Typography>
                                                    <strong>Du :</strong> {new Date(conge.dateDebut).toLocaleDateString()}
                                                </Typography>
                                                <Typography>
                                                    <strong>Au :</strong> {new Date(conge.dateFin).toLocaleDateString()}
                                                </Typography>
                                                <Typography>
                                                    <strong>Motif :</strong> {conge.motif}
                                                </Typography>
                                                <Typography>
                                                    <strong>Statut :</strong> {conge.statut}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}

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
                </Container>
            </Content>
        </Root>
    );
};

export default Conges;