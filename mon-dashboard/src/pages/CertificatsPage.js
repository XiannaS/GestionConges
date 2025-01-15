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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
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
    Add,
    Delete,
    Edit,
    Download,
} from "@mui/icons-material";
import { Root, AppBarStyled, DrawerStyled, Content } from "../styles/DashboardStyles";
import { Link } from "react-router-dom";
import { useTheme } from "../styles/ThemeContext";
import axios from "axios";

const CertificatsPage = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [certificats, setCertificats] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCertificat, setSelectedCertificat] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    // Charger les certificats médicaux depuis l'API
    useEffect(() => {
        const fetchCertificats = async () => {
            try {
                const response = await axios.get("http://localhost:5126/api/CertificatMedical");
                setCertificats(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des certificats :", error);
                showSnackbar("Erreur lors de la récupération des certificats", "error");
            }
        };
        fetchCertificats();
    }, []);

    // Ouvrir le dialogue pour ajouter/modifier un certificat
    const handleOpenDialog = (certificat = null) => {
        setSelectedCertificat(certificat);
        setOpenDialog(true);
    };

    // Fermer le dialogue
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedCertificat(null);
    };

    // Gérer la suppression d'un certificat
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5126/api/CertificatMedical/${id}`);
            setCertificats(certificats.filter((certificat) => certificat.id !== id));
            showSnackbar("Certificat supprimé avec succès", "success");
        } catch (error) {
            console.error("Erreur lors de la suppression du certificat :", error);
            showSnackbar("Erreur lors de la suppression du certificat", "error");
        }
    };

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

    return (
        <Root>
            {/* En-tête */}
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

            {/* Contenu principal */}
            <Content>
                <Grid container spacing={3}>
                    {/* Titre et bouton d'ajout */}
                    <Grid item xs={12}>
                        <Paper
                            style={{
                                padding: "16px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: darkMode ? '#424242' : '#fff', // Fond dynamique
                            }}
                        >
                            <Typography variant="h5" style={{ color: darkMode ? 'white' : 'black' }}> {/* Texte dynamique */}
                                Gestion des certificats médicaux
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Add />}
                                onClick={() => handleOpenDialog()}
                            >
                                Ajouter un certificat
                            </Button>
                        </Paper>
                    </Grid>

                    {/* Tableau des certificats */}
                    <Grid item xs={12}>
                        <Paper
                            style={{
                                padding: "16px",
                                backgroundColor: darkMode ? '#424242' : '#fff', // Fond dynamique
                            }}
                        >
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ color: darkMode ? 'white' : 'black' }}>Employé</TableCell>
                                            <TableCell style={{ color: darkMode ? 'white' : 'black' }}>Date de début</TableCell>
                                            <TableCell style={{ color: darkMode ? 'white' : 'black' }}>Date de fin</TableCell>
                                            <TableCell style={{ color: darkMode ? 'white' : 'black' }}>Commentaire</TableCell>
                                            <TableCell style={{ color: darkMode ? 'white' : 'black' }}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {certificats.map((certificat) => (
                                            <TableRow key={certificat.id}>
                                                <TableCell style={{ color: darkMode ? 'white' : 'black' }}>{certificat.employe?.nom}</TableCell>
                                                <TableCell style={{ color: darkMode ? 'white' : 'black' }}>{new Date(certificat.dateDebut).toLocaleDateString()}</TableCell>
                                                <TableCell style={{ color: darkMode ? 'white' : 'black' }}>{new Date(certificat.dateFin).toLocaleDateString()}</TableCell>
                                                <TableCell style={{ color: darkMode ? 'white' : 'black' }}>{certificat.commentaire}</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleOpenDialog(certificat)}
                                                    >
                                                        <Edit style={{ color: darkMode ? 'white' : 'black' }} /> {/* Icône dynamique */}
                                                    </IconButton>
                                                    <IconButton
                                                        color="secondary"
                                                        onClick={() => handleDelete(certificat.id)}
                                                    >
                                                        <Delete style={{ color: darkMode ? 'white' : 'black' }} /> {/* Icône dynamique */}
                                                    </IconButton>
                                                    <IconButton
                                                        color="success"
                                                        onClick={() => window.open(certificat.filePath, "_blank")}
                                                    >
                                                        <Download style={{ color: darkMode ? 'white' : 'black' }} /> {/* Icône dynamique */}
                                                    </IconButton>
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

            {/* Dialogue pour ajouter/modifier un certificat */}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{selectedCertificat?.id ? "Modifier un certificat" : "Ajouter un certificat"}</DialogTitle>
                <DialogContent>
                    {/* Champ pour l'ID de l'employé */}
                    <TextField
                        label="ID de l'employé"
                        fullWidth
                        margin="normal"
                        value={selectedCertificat?.employeId || ""}
                        onChange={(e) =>
                            setSelectedCertificat((prevState) => ({
                                ...prevState,
                                employeId: e.target.value,
                            }))
                        }
                    />

                    {/* Champ pour la date de début */}
                    <TextField
                        label="Date de début"
                        type="date"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        value={selectedCertificat?.dateDebut || ""}
                        onChange={(e) =>
                            setSelectedCertificat((prevState) => ({
                                ...prevState,
                                dateDebut: e.target.value,
                            }))
                        }
                    />

                    {/* Champ pour la date de fin */}
                    <TextField
                        label="Date de fin"
                        type="date"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        value={selectedCertificat?.dateFin || ""}
                        onChange={(e) =>
                            setSelectedCertificat((prevState) => ({
                                ...prevState,
                                dateFin: e.target.value,
                            }))
                        }
                    />

                    {/* Champ pour le commentaire */}
                    <TextField
                        label="Commentaire"
                        fullWidth
                        margin="normal"
                        value={selectedCertificat?.commentaire || ""}
                        onChange={(e) =>
                            setSelectedCertificat((prevState) => ({
                                ...prevState,
                                commentaire: e.target.value,
                            }))
                        }
                    />

                    {/* Champ pour le fichier PDF */}
                    <TextField
                        label="Fichier PDF"
                        type="file"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setSelectedCertificat((prevState) => ({
                                ...prevState,
                                file: file,
                            }));
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Annuler
                    </Button>
                    <Button
                        onClick={async () => {
                            try {
                                const formData = new FormData();
                                formData.append("employeId", selectedCertificat.employeId);
                                formData.append("dateDebut", selectedCertificat.dateDebut);
                                formData.append("dateFin", selectedCertificat.dateFin);
                                formData.append("commentaire", selectedCertificat.commentaire);
                                formData.append("file", selectedCertificat.file);

                                if (selectedCertificat.id) {
                                    // Mettre à jour un certificat existant
                                    await axios.put(
                                        `http://localhost:5126/api/CertificatMedical/${selectedCertificat.id}`,
                                        formData,
                                        {
                                            headers: {
                                                "Content-Type": "multipart/form-data",
                                            },
                                        }
                                    );
                                    showSnackbar("Certificat mis à jour avec succès", "success");
                                } else {
                                    // Ajouter un nouveau certificat
                                    await axios.post(
                                        "http://localhost:5126/api/CertificatMedical",
                                        formData,
                                        {
                                            headers: {
                                                "Content-Type": "multipart/form-data",
                                            },
                                        }
                                    );
                                    showSnackbar("Certificat ajouté avec succès", "success");
                                }

                                // Recharger la liste des certificats
                                const response = await axios.get("http://localhost:5126/api/CertificatMedical");
                                setCertificats(response.data);

                                // Fermer le dialogue
                                handleCloseDialog();
                            } catch (error) {
                                console.error("Erreur lors de la soumission du formulaire :", error);
                                showSnackbar("Erreur lors de la soumission du formulaire", "error");
                            }
                        }}
                        color="primary"
                    >
                        {selectedCertificat?.id ? "Modifier" : "Ajouter"}
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
        </Root>
    );
};

export default CertificatsPage;