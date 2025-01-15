import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
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
    Edit,
    Delete,
} from "@mui/icons-material";
import { Root, AppBarStyled, DrawerStyled, Content } from "../styles/DashboardStyles";
import { Link } from "react-router-dom";
import { useTheme } from "../styles/ThemeContext"; // Importer le contexte de thème

const Employes = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [employes, setEmployes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newEmploye, setNewEmploye] = useState({
        nom: "",
        prenom: "",
        email: "",
        soldeConge: 0,
    });
    const [isEditing, setIsEditing] = useState(false); // Pour savoir si on est en mode édition
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("nom");
    const [sortOrder, setSortOrder] = useState("asc"); // 'asc' ou 'desc'
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Pour la confirmation de suppression
    const [selectedEmployeId, setSelectedEmployeId] = useState(null); // ID de l'employé à supprimer
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [isSubmitting, setIsSubmitting] = useState(false); // Pour gérer l'état de soumission

    // Chargement des employés
    useEffect(() => {
        axios
            .get("http://localhost:5126/api/employes")
            .then((response) => {
                setEmployes(response.data.$values || []); // Utiliser $values si présent
                setLoading(false);
            })
            .catch((error) => {
                setError("Erreur lors de la récupération des employés");
                setLoading(false);
                showSnackbar("Erreur lors de la récupération des employés", "error");
            });
    }, []);

    // Fonction pour gérer le changement des champs dans le formulaire
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewEmploye((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Fonction pour ajouter ou modifier un employé
    const handleSubmitEmploye = () => {
        if (!newEmploye.nom || !newEmploye.prenom || !newEmploye.email) {
            showSnackbar("Veuillez remplir tous les champs obligatoires", "error");
            return;
        }

        setIsSubmitting(true);

        if (isEditing) {
            // Modification
            axios
                .put(`http://localhost:5126/api/employes/${newEmploye.id}`, newEmploye)
                .then((response) => {
                    setEmployes(
                        employes.map((employe) =>
                            employe.id === newEmploye.id ? response.data : employe
                        )
                    );
                    setNewEmploye({
                        nom: "",
                        prenom: "",
                        email: "",
                        soldeConge: 0,
                    });
                    setIsEditing(false);
                    showSnackbar("Employé modifié avec succès", "success");
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la modification de l'employé:",
                        error.response?.data || error.message
                    );
                    showSnackbar("Erreur lors de la modification de l'employé", "error");
                })
                .finally(() => setIsSubmitting(false));
        } else {
            // Ajout
            axios
                .post("http://localhost:5126/api/employes", newEmploye)
                .then((response) => {
                    setEmployes([...employes, response.data]);
                    setNewEmploye({
                        nom: "",
                        prenom: "",
                        email: "",
                        soldeConge: 0,
                    });
                    showSnackbar("Employé ajouté avec succès", "success");
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de l'ajout de l'employé:",
                        error.response?.data || error.message
                    );
                    showSnackbar("Erreur lors de l'ajout de l'employé", "error");
                })
                .finally(() => setIsSubmitting(false));
        }
    };

    // Fonction pour gérer la suppression
    const handleDeleteEmploye = (id) => {
        setSelectedEmployeId(id);
        setOpenDeleteDialog(true); // Ouvrir la boîte de dialogue de confirmation
    };

    // Confirmer la suppression
    const confirmDelete = () => {
        axios
            .delete(`http://localhost:5126/api/employes/${selectedEmployeId}`)
            .then(() => {
                setEmployes(employes.filter((employe) => employe.id !== selectedEmployeId)); // Mettre à jour la liste
                setOpenDeleteDialog(false); // Fermer la boîte de dialogue
                showSnackbar("Employé supprimé avec succès", "success");
            })
            .catch((error) => {
                setError("Erreur lors de la suppression de l'employé");
                setOpenDeleteDialog(false); // Fermer la boîte de dialogue
                showSnackbar("Erreur lors de la suppression de l'employé", "error");
            });
    };

    // Annuler la suppression
    const cancelDelete = () => {
        setOpenDeleteDialog(false); // Fermer la boîte de dialogue
    };

    // Filtrer les employés en fonction du terme de recherche
    const filteredEmployes = useMemo(() => {
        return employes.filter(
            (employe) =>
                (employe.nom && employe.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (employe.prenom && employe.prenom.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (employe.email && employe.email.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [employes, searchTerm]);

    // Trier les employés
    const sortedEmployes = useMemo(() => {
        return [...filteredEmployes].sort((a, b) => {
            if (sortOrder === "asc") {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            }
        });
    }, [filteredEmployes, sortBy, sortOrder]);

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

    if (loading) {
        return (
            <Container style={{ textAlign: "center", marginTop: "20px" }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container style={{ textAlign: "center", marginTop: "20px" }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Root>
            <AppBarStyled position="fixed" style={{ backgroundColor: darkMode ? '#424242' : 'transparent' }}>
                {/* Côté gauche vide (seulement le mot "ADMINIS") */}
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
                            width: 400, // Largeur de la barre de recherche
                            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)', // Fond semi-transparent
                            borderRadius: 8, // Bordures arrondies
                            padding: '2px 4px', // Espacement interne
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

            <DrawerStyled
                variant="permanent"
                PaperProps={{ style: { backgroundColor: darkMode ? '#333' : '#fff' } }}
            >
                <List>
                    {/* Titre "ADMINIS" avec espace en dessous */}
                    <ListItem style={{ marginBottom: 24 }}> {/* Ajoutez une marge en bas */}
                        <ListItemText
                            primary=" "
                            style={{ color: darkMode ? 'white' : 'black' }}
                        />
                    </ListItem>

                    {/* Utilisateur avec icône */}
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

                    {/* Autres éléments de la barre latérale */}
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

            <Content>
                <Container>
                    <Typography variant="h4" gutterBottom style={{ color: darkMode ? 'white' : 'black' }}>
                        Liste des employés
                    </Typography>

                    {/* Formulaire d'ajout/modification */}
                    <Paper
                        style={{
                            padding: "16px",
                            marginBottom: "24px",
                            backgroundColor: darkMode ? '#424242' : '#fff', // Fond dynamique
                        }}
                    >
                        <Typography variant="h6" gutterBottom style={{ color: darkMode ? 'white' : 'black' }}>
                            {isEditing ? "Modifier un employé" : "Ajouter un employé"}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Nom"
                                    variant="outlined"
                                    fullWidth
                                    name="nom"
                                    value={newEmploye.nom}
                                    onChange={handleInputChange}
                                    InputLabelProps={{ style: { color: darkMode ? 'white' : 'black' } }}
                                    InputProps={{ style: { color: darkMode ? 'white' : 'black' } }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Prénom"
                                    variant="outlined"
                                    fullWidth
                                    name="prenom"
                                    value={newEmploye.prenom}
                                    onChange={handleInputChange}
                                    InputLabelProps={{ style: { color: darkMode ? 'white' : 'black' } }}
                                    InputProps={{ style: { color: darkMode ? 'white' : 'black' } }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    name="email"
                                    value={newEmploye.email}
                                    onChange={handleInputChange}
                                    InputLabelProps={{ style: { color: darkMode ? 'white' : 'black' } }}
                                    InputProps={{ style: { color: darkMode ? 'white' : 'black' } }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Solde de congé"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    name="soldeConge"
                                    value={newEmploye.soldeConge}
                                    onChange={handleInputChange}
                                    InputLabelProps={{ style: { color: darkMode ? 'white' : 'black' } }}
                                    InputProps={{ style: { color: darkMode ? 'white' : 'black' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmitEmploye}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <CircularProgress size={24} />
                                    ) : isEditing ? (
                                        "Modifier"
                                    ) : (
                                        "Ajouter"
                                    )}
                                </Button>
                                {isEditing && (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            setNewEmploye({
                                                nom: "",
                                                prenom: "",
                                                email: "",
                                                soldeConge: 0,
                                            });
                                            setIsEditing(false);
                                        }}
                                        style={{ marginLeft: "8px" }}
                                    >
                                        Annuler
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Recherche et tri */}
                    <Grid container spacing={2} style={{ marginBottom: "16px" }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Rechercher..."
                                variant="outlined"
                                fullWidth
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <IconButton>
                                            <SearchIcon style={{ color: darkMode ? 'white' : 'black' }} />
                                        </IconButton>
                                    ),
                                    style: { color: darkMode ? 'white' : 'black' },
                                }}
                                InputLabelProps={{ style: { color: darkMode ? 'white' : 'black' } }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => {
                                    setSortBy("nom");
                                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                }}
                            >
                                Trier par nom {sortBy === "nom" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => {
                                    setSortBy("soldeConge");
                                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                }}
                            >
                                Trier par solde {sortBy === "soldeConge" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Table des employés */}
                    <TableContainer
                        component={Paper}
                        style={{ backgroundColor: darkMode ? '#424242' : '#fff' }} // Fond dynamique
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ color: darkMode ? 'white' : 'black' }}>
                                        <strong>Nom</strong>
                                    </TableCell>
                                    <TableCell style={{ color: darkMode ? 'white' : 'black' }}>
                                        <strong>Prénom</strong>
                                    </TableCell>
                                    <TableCell style={{ color: darkMode ? 'white' : 'black' }}>
                                        <strong>Email</strong>
                                    </TableCell>
                                    <TableCell style={{ color: darkMode ? 'white' : 'black' }}>
                                        <strong>Solde de congé</strong>
                                    </TableCell>
                                    <TableCell style={{ color: darkMode ? 'white' : 'black' }}>
                                        <strong>Actions</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedEmployes.map((employe) => (
                                    <TableRow key={employe.id}>
                                        <TableCell style={{ color: darkMode ? 'white' : 'black' }}>{employe.nom}</TableCell>
                                        <TableCell style={{ color: darkMode ? 'white' : 'black' }}>{employe.prenom}</TableCell>
                                        <TableCell style={{ color: darkMode ? 'white' : 'black' }}>{employe.email}</TableCell>
                                        <TableCell style={{ color: darkMode ? 'white' : 'black' }}>{employe.soldeConge}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="primary"
                                                onClick={() => {
                                                    setNewEmploye(employe);
                                                    setIsEditing(true);
                                                }}
                                            >
                                                <Edit style={{ color: darkMode ? 'white' : 'black' }} /> {/* Icône dynamique */}
                                            </IconButton>
                                            <IconButton
                                                color="secondary"
                                                onClick={() => handleDeleteEmploye(employe.id)}
                                            >
                                                <Delete style={{ color: darkMode ? 'white' : 'black' }} /> {/* Icône dynamique */}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Boîte de dialogue de confirmation pour la suppression */}
                    <Dialog
                        open={openDeleteDialog}
                        onClose={cancelDelete}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        PaperProps={{
                            style: {
                                backgroundColor: darkMode ? '#424242' : '#fff', // Fond dynamique
                            },
                        }}
                    >
                        <DialogTitle
                            id="alert-dialog-title"
                            style={{ color: darkMode ? 'white' : 'black' }} // Texte dynamique
                        >
                            Confirmer la suppression
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText
                                id="alert-dialog-description"
                                style={{ color: darkMode ? 'white' : 'black' }} // Texte dynamique
                            >
                                Êtes-vous sûr de vouloir supprimer cet employé ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={cancelDelete} color="primary">
                                Annuler
                            </Button>
                            <Button onClick={confirmDelete} color="secondary" autoFocus>
                                Supprimer
                            </Button>
                        </DialogActions>
                    </Dialog>

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

export default Employes;