// src/pages/home/Home.jsx
import React from 'react';
import { Box, Button, Container, Grid2, Typography } from '@mui/material';
// Asegúrate de que la importación de Grid2 sea la correcta para tu versión de MUI
import { darken, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Ruta a tu imagen. Asegúrate de que esté accesible desde la carpeta `public`
const imageUrl = '/images/uniblog-home.png'; // ej: public/images/univalle-logo.webp

export default function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log('Botón "Comienza a leer" presionado');
    navigate("/inicio")
  };

  const primaryButtonColor = '#ffcdd2';
  // Overlay semitransparente para mejorar la legibilidad del texto sobre la imagen
  // Ajusta el valor alpha (0.3 aquí) para más o menos opacidad
  const overlayBackgroundColor = alpha('#0000000', 0); // Negro con 35% de opacidad

  return (
    <Box
      sx={{
        position: 'relative', // Necesario para el pseudo-elemento ::before (overlay)
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center', // Centra el Container verticalmente
        minHeight: 'calc(100vh - 64px)', // Asume AppBar de 64px. Ajusta si es necesario.
        py: { xs: 6, md: 8 }, // Padding vertical general, aumentado un poco
        
        // Estilos para la imagen de fondo
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',      // Cubre todo el área, puede recortar para mantener aspect ratio
        backgroundPosition: 'center center', // Centra la imagen
        backgroundRepeat: 'no-repeat',
        
        // Color de fallback si la imagen no carga (aunque el overlay lo cubrirá en parte)
        backgroundColor: '#ececea', 

        // Color de texto por defecto para esta sección, asumiendo overlay oscuro
        color: '#ffffff', 

        // Pseudo-elemento para el overlay
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: overlayBackgroundColor,
          zIndex: 1, // Overlay por encima del fondo, por debajo del contenido
        },
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'fixed', // Para que el contenido esté sobre el overlay
          zIndex: 2,            // Contenido encima del overlay
          height: '100%',        // Para que el Grid2 pueda alinearse bien si es necesario
          display: 'flex',      // Ayuda a centrar el contenido si es necesario
          alignItems: 'center', // Centra el Grid2 verticalmente dentro del Container
        }}
      >
        {/* Usamos Grid2 para estructurar el contenido de texto */}
        <Grid2 
          container // Contenedor del Grid
          // No es necesario alignItems="stretch" si solo hay un item principal
          // justifyContent="flex-start" // Alinea el contenido del Grid a la izquierda
        >
          {/* Columna Única para el Texto y Botón, más a la izquierda */}
          <Grid2
            // lg={6} // Podrías hacerlo más estrecho en pantallas muy grandes
            sx={{
              // El textAlign 'left' se aplicará al contenido dentro de este Grid2 item
              // El margen izquierdo ya lo da el padding 'pl'
              textAlign: { xs: 'center', md: 'left' },
              // Padding para crear el margen interno y no pegar al borde del container
              pl: { xs: 2, sm: 3, md: 'calc(max(32px, 5%))' }, // Margen izquierdo responsivo
              pr: { xs: 2, sm: 3, md: 2 }, // Un poco de padding derecho
            }}
          >
            {/* Contenedor directo del texto para asegurar alineación si es necesario */}
            <Box> 
              <Typography
                variant="h1"
                component="h1"
                color='#000000'
                sx={{
                  fontFamily: 'TanMonCheri, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(3.5rem, 8vw, 10rem)', // Grande y responsivo
                  lineHeight: 1.2,
                  marginBottom: 2,
                  textShadow: '0px 2px 4px rgba(0,0,0,0.5)', // Sombra para legibilidad sobre imagen
                }}
              >
                Uniblog
              </Typography>
              <Typography
                variant="h5"
                component="p"
                color="rgba(0, 0, 0, 0.9)" // Un blanco ligeramente menos intenso
                sx={{
                  marginBottom: 4,
                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                  textShadow: '0px 1px 3px rgba(0,0,0,0.4)', // Sombra para legibilidad
                }}
              >
                Porque tu conocimiento importa
              </Typography>
              <Button
                variant="contained"
                onClick={handleLoginClick}
                sx={{
                  backgroundColor: primaryButtonColor,
                  color: '#000000', // Texto negro para contraste con #f3a28d
                  borderRadius: '8px',
                  padding: '12px 28px', // Un poco más de padding
                  fontSize: '1rem',
                  textTransform: 'none', // Sin mayúsculas
                  boxShadow: '0px 3px 6px rgba(0,0,0,0.25)', // Sombra un poco más notoria sobre fondo complejo
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: darken(primaryButtonColor, 0.1),
                    boxShadow: '0px 5px 10px rgba(0,0,0,0.3)', // Sombra más fuerte en hover
                  },
                }}
              >
                Comienza a explorar
              </Button>
            </Box>
          </Grid2>
          {/* No hay segunda columna para la imagen, ya es el fondo */}
        </Grid2>
      </Container>
    </Box>
  );
}