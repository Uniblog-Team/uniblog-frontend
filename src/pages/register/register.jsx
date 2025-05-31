import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography,
  styled,
  Alert 
} from '@mui/material';
import { darken, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Contenedor para formulario
const StyledContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,  // Asegura que esté sobre el overlay
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    padding: theme.spacing(3),
  },
}));

// Botón base
const BaseButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 8,
  fontWeight: 500,
  textTransform: 'none',  // evita transformación a mayúsculas
  marginTop: theme.spacing(2),
  color: theme.palette.common.black,
  boxShadow: theme.shadows[2],
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const Registro = () => {
  const navigate = useNavigate();
  // Estados para manejar los valores del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  
  // colores personalizados para los botones
  const primaryButtonColor = '#ffcdd2';    // rosa claro
  const secondaryButtonColor = '#e3f2fd';  // azul claro

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error de contraseñas no coincidentes al modificar
    if (name === 'password' || name === 'confirmPassword') {
      setError('');
    }
  };

  // maneja envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación de campos requeridos (manejada por el navegador)
    if (!e.target.checkValidity()) {
      return;
    }
    
    // Validación de contraseñas coincidentes
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    // Si todo está correcto, navegar a /inicio
    navigate("/inicio");
  };

  // maneja el registro con Google
  const handleGoogleRegister = () => {
    console.log('Registro con Google');
    // Implementa lógica de autenticación con Google
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',   // ocupa todo el ancho visible
        height: '100vh',  // ocupa toda la altura visible
        overflow: 'hidden', // evita scrollbars
        backgroundColor: '#f5f5f5', // fallback si la imagen no carga
        backgroundImage: 'url(/images/uniblog-home.png)', // imagen de fondo
        backgroundSize: 'cover',    // cubre todo el espacio
        backgroundPosition: 'center', // centra la imagen
        backgroundRepeat: 'no-repeat', // evita repetición
        backgroundAttachment: 'fixed', // efecto parallax
        position: 'fixed', // fija la posición en la pantalla
        top: 0,
        left: 0,
        '&::before': {  // overlay semitransparente
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: alpha('#000', 0.5), 
          zIndex: 1,  // se coloca entre el fondo y el contenido
        },
      }}
    >
      {/* Contenedor del formulario con ancho máximo 'sm' (600px) */}
      <StyledContainer maxWidth="sm"> 
        
        <Typography // titulo
          variant="h4" 
          component="h1"  // semánticamente importante para SEO
          gutterBottom  // margen inferior
          sx={{
            color: 'common.black',
            textAlign: 'center',
            mb: 4,  // margen bottom
            fontFamily: 'TanMonCheri, sans-serif', // fuente de la page
            fontWeight: 600,
            fontSize: '2.125rem', // Tamaño específico para prueba responsive
            [theme => theme.breakpoints.down('sm')]: {  // responsivo
              fontSize: '1.75rem',  // tamaño menor en móviles
            },
          }}
        >
          Crea tu cuenta
        </Typography>
        
        {/* Mostrar error de contraseñas no coincidentes */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box // formulario de registro
          component="form" 
          onSubmit={handleSubmit}
          noValidate // Desactiva validación HTML para manejar nosotros
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,  // espacio entre elementos
          }}
        >
          
          <TextField // nombre
            name="nombre"
            label="Nombre completo"
            variant="outlined"
            fullWidth  // ocupa todo el ancho disponible
            required  // campo obligatorio
            value={formData.nombre}
            onChange={handleChange}
            inputProps={{
              'data-testid': 'nombre-input' // Para pruebas
            }}
          />
          
          <TextField // correo
            name="email"
            label="Correo electrónico"
            variant="outlined"
            fullWidth
            type="email"  // valida formato de correo
            required
            value={formData.email}
            onChange={handleChange}
            inputProps={{
              'data-testid': 'email-input' // Para pruebas
            }}
          />
          
          <TextField // contraseña
            name="password"
            label="contraseña"
            variant="outlined"
            fullWidth
            type="password"  // oculta el texto
            required
            value={formData.password}
            onChange={handleChange}
            inputProps={{
              'data-testid': 'password-input' // Para pruebas
            }}
          />
          
          <TextField // confirma contraseña
            name="confirmPassword"
            label="confirmar contrasena"
            variant="outlined"
            fullWidth
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            inputProps={{
              'data-testid': 'confirm-password-input' // Para pruebas
            }}
          />
          
          <BaseButton // boton de registrar
            type="submit"  
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: primaryButtonColor,
              '&:hover': {
                backgroundColor: darken(primaryButtonColor, 0.1), // efecto que oscurece al hover
              },
            }}
            data-testid="register-button" // Para pruebas
          >
            Registro
          </BaseButton>
        </Box>

        
        <Typography  // separador
          variant="body1"
          sx={{
            textAlign: 'center',
            my: 3,  // margen vertical
            color: 'common.black',
            display: 'flex',
            alignItems: 'center',
            '&::before, &::after': {  // líneas decorativas
              content: '""',
              flex: 1,
              borderBottom: '1px solid',
              borderColor: 'divider',
              margin: 'auto',
            },
            '&::before': {
              mr: 1,  // margen derecho
            },
            '&::after': {
              ml: 1,  // margen izquierdo
            },
          }}
        >
          o regístrate con
        </Typography>

        
        <BaseButton // registro con google
          variant="contained"
          fullWidth
          onClick={handleGoogleRegister}
          sx={{
            backgroundColor: secondaryButtonColor,
            '&:hover': {
              backgroundColor: darken(secondaryButtonColor, 0.1),
            },
          }}
          startIcon={  // icono de Google
            <img 
              src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png" 
              alt="Google logo" 
              style={{ width: 20, height: 20 }}
            />
          }
          data-testid="google-button" // Para pruebas
        >
          Registrarse con Google
        </BaseButton>

        <Typography // ya existe cuenta creada
          variant="body2"
          sx={{
            textAlign: 'center',
            mt: 3,  // margen top
            color: 'common.black',
          }}
        >
          ¿Ya tienes una cuenta?{' '}
          <Button 
            onClick={() => navigate("/login")}
            sx={{
              textTransform: 'none',  // sin mayúsculas
              p: 0,  
              minWidth: 'auto',  // ancho mínimo
              color: 'primary.main',  // color del tema
              fontWeight: 500,
            }}
            data-testid="login-button" // Para pruebas
          >
            Inicia sesión
          </Button>
        </Typography>
      </StyledContainer>
    </Box>
  );
};

export default Registro;