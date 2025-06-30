import { Button, Container, Typography, styled } from '@mui/material';
import { darken, alpha } from '@mui/material/styles';

// Contenedor del formulario, sin cambios, solo movido aquí.
export const AuthFormContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    padding: theme.spacing(3),
  },
}));

// Título principal de las páginas de autenticación
export const AuthTitle = styled(Typography)(({ theme }) => ({
  variant: "h4",
  component: "h1",
  gutterBottom: true,
  color: 'common.black',
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  fontFamily: 'TanMonCheri, sans-serif',
  fontWeight: 600,
  fontSize: '2.125rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.75rem',
  },
}));

// Botón base para extender.
const BaseButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 8,
  fontWeight: 500,
  textTransform: 'none',
  marginTop: theme.spacing(2),
  color: theme.palette.common.black,
  boxShadow: theme.shadows[2],
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

// Botón de acción principal (Registro, Entrar)
const primaryButtonColor = '#ffcdd2';
export const PrimaryAuthButton = styled(BaseButton)({
  backgroundColor: primaryButtonColor,
  '&:hover': {
    backgroundColor: darken(primaryButtonColor, 0.1),
  },
});

// Botón de Google
const secondaryButtonColor = '#e3f2fd';
export const GoogleAuthButton = styled(BaseButton)({
  backgroundColor: secondaryButtonColor,
  '&:hover': {
    backgroundColor: darken(secondaryButtonColor, 0.1),
  },
  marginTop: 0,
});

// Separador con texto "o..."
export const Separator = ({ text }) => (
  <Typography
    variant="body1"
    sx={{
      textAlign: 'center',
      my: 3,
      color: 'common.black',
      display: 'flex',
      alignItems: 'center',
      '&::before, &::after': {
        content: '""',
        flex: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        margin: 'auto',
      },
      '&::before': { mr: 1 },
      '&::after': { ml: 1 },
    }}
  >
    {text}
  </Typography>
);