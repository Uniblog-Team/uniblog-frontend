import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography,
  styled 
} from '@mui/material';
import { darken, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
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

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  
  const primaryButtonColor = '#ffcdd2'; // Rosa claro
  const secondaryButtonColor = '#e3f2fd'; // Azul claro

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Iniciando sesión:', form);
    navigate("/inicio");
  };

  const handleGoogleLogin = () => {
    console.log('Iniciando sesión con Google');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',       // Ancho completo del viewport
        height: '100vh',      // Alto completo del viewport
        overflow: 'hidden',   // Evita barras de desplazamiento
        backgroundColor: '#f5f5f5',
        backgroundImage: 'url(/images/uniblog-home.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', // Evita repetición de la imagen
        backgroundAttachment: 'fixed', // Fija el fondo al desplazar
        position: 'fixed',    // Fija el contenedor en la pantalla
        top: 0,
        left: 0,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: alpha('#000', 0.5),
          zIndex: 1,
        },
      }}
    >
      <StyledContainer maxWidth="sm">
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{
            color: 'common.black',
            textAlign: 'center',
            mb: 4,
            fontFamily: 'TanMonCheri, sans-serif',
            fontWeight: 600,
            [theme => theme.breakpoints.down('sm')]: {
              fontSize: '1.75rem',
            },
          }}
        >
          Inicia sesión
        </Typography>
        
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Correo electrónico"
            variant="outlined"
            fullWidth
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
          />
          
          <TextField
            label="Contraseña"
            variant="outlined"
            fullWidth
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
          />
          
          <BaseButton
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: primaryButtonColor,
              '&:hover': {
                backgroundColor: darken(primaryButtonColor, 0.1),
              },
            }}
          >
            Entrar
          </BaseButton>
        </Box>

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
            '&::before': {
              mr: 1,
            },
            '&::after': {
              ml: 1,
            },
          }}
        >
          o inicia sesión con
        </Typography>

        <BaseButton
          variant="contained"
          fullWidth
          onClick={handleGoogleLogin}
          sx={{
            backgroundColor: secondaryButtonColor,
            '&:hover': {
              backgroundColor: darken(secondaryButtonColor, 0.1),
            },
          }}
          startIcon={
            <img 
              src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png" 
              alt="Google logo" 
              style={{ width: 20, height: 20 }}
            />
          }
        >
          Continuar con Google
        </BaseButton>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button 
            //onClick={() => navigate("/forgot-password")}
            sx={{
              textTransform: 'none',
              p: 0,
              minWidth: 'auto',
              color: 'common.black',
              fontWeight: 500,
            }}
          >
            ¿Olvidaste tu contraseña?
          </Button>
          
          <Button 
            onClick={() => navigate("/register")}
            sx={{
              textTransform: 'none',
              p: 0,
              minWidth: 'auto',
              color: 'primary.main',
              fontWeight: 500,
            }}
          >
            Crear cuenta
          </Button>
        </Box>
      </StyledContainer>
    </Box>
  );
};

export default Login;