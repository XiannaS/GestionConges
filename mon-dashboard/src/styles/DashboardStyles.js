import { styled } from '@mui/system';
import { AppBar, Drawer } from '@mui/material';

export const Root = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

export const AppBarStyled = styled(AppBar)(({ theme }) => ({
    flexDirection: 'row',
    justifyContent: 'space-between', // Espace entre les éléments de gauche et de droite
    alignItems: 'center', // Centrer verticalement les éléments
    padding: '0 16px',
    backgroundColor: 'transparent', // Pour enlever la bande bleue
    boxShadow: 'none', // Pour enlever l'ombre
    position: 'fixed', // Fixer l'AppBar en haut
    width: '100%', // Prend toute la largeur
    zIndex: 1200, // Assure que l'AppBar est au-dessus de la barre latérale
}));

export const DrawerStyled = styled(Drawer)({
    width: 240,
    flexShrink: 0,
    position: 'fixed', // Fixer la barre latérale
    height: '100vh', // Prend toute la hauteur de la page
    overflowY: 'auto', // Permet le défilement si le contenu est trop long
});

export const DrawerPaperStyled = styled('div')({
    width: 240,
});

export const Content = styled('main')({
    flexGrow: 1,
    padding: 24,
    marginLeft: 240, // Décalage égal à la largeur de la barre latérale
    marginTop: 64, // Décalage égal à la hauteur de l'AppBar
});

// Nouveau style pour le conteneur de la barre de recherche
export const SearchContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.mode === 'dark' ? '#616161' : '#f5f5f5', // Fond en fonction du mode
    borderRadius: 8, // Bordures arrondies
    padding: '2px 4px', // Espacement interne
    width: 300, // Largeur de la barre de recherche
    marginLeft: 'auto', // Aligner à droite
}));