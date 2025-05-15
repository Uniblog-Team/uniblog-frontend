// src/components/BlogPreviewCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const getInitials = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

const BlogPreviewCard = ({
  id,
  imageUrl,
  title,
  authorName,
  authorAvatarUrl,
  likes,
  commentsCount,
  publicationDate,
  onClick,
}) => {
  const formattedDate = publicationDate
    ? new Date(publicationDate).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Fecha no disponible';

  return (
    <Card
      sx={{
        maxWidth: 345,
        m: 2,
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
        display: 'flex', // Añadido para controlar mejor la estructura interna si es necesario
        flexDirection: 'column', // Asegura que CardContent esté debajo de CardMedia
        // Opcional: si quieres que todas las tarjetas tengan la misma altura
        // height: '100%', // Descomenta si tu Grid item padre tiene display: flex y quieres igualar alturas
      }}
      onClick={() => onClick(id)}
    >
      <CardMedia
        component="img"
        // Quitamos el height fijo en pixels
        // height="190"
        image={imageUrl || 'https://via.placeholder.com/345x190?text=Sin+Imagen'}
        alt={title || 'Título del blog'}
        sx={{
          // Mantenemos una relación de aspecto para la imagen (ej. 16:9)
          // Esto hará que la altura se ajuste en proporción al ancho disponible
          aspectRatio: '16/9', // Puedes ajustar esto (e.g., '3/2', '4/3', '1/1')
          // Esto es CLAVE: la imagen cubrirá el área, recortándose si es necesario,
          // sin perder su proporción ni estirar el contenedor.
          objectFit: 'cover',
          // Opcional: si quieres una altura máxima en caso de que el aspectRatio haga la imagen muy alta en anchos pequeños
          // maxHeight: 200, // Por ejemplo
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}> {/* flexGrow permite que CardContent se expanda si la Card tiene altura fija */}
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            minHeight: '2.8em', // Ajustado ligeramente para asegurar espacio para dos líneas
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.4em', // Asegurar consistencia en la altura de línea
          }}
        >
          {title || 'Título del Blog Indefinido'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          {authorAvatarUrl ? (
            <Avatar src={authorAvatarUrl} alt={authorName} sx={{ width: 28, height: 28, mr: 1 }} />
          ) : (
            <Avatar sx={{ width: 28, height: 28, mr: 1, bgcolor: 'secondary.main' }}>
              {getInitials(authorName)}
            </Avatar>
          )}
          <Typography variant="subtitle2" color="text.secondary">
            {authorName || 'Autor Desconocido'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 2 }}>
          <CalendarTodayIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
          <Typography variant="caption">
            {formattedDate}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="me gustas" size="small" sx={{ p: 0.5 }} disabled>
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              {likes}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="comentarios" size="small" sx={{ p: 0.5 }} disabled>
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              {commentsCount}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

BlogPreviewCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorAvatarUrl: PropTypes.string,
  likes: PropTypes.number.isRequired,
  commentsCount: PropTypes.number.isRequired,
  publicationDate: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

BlogPreviewCard.defaultProps = {
  imageUrl: 'https://via.placeholder.com/345x190?text=Sin+Imagen',
  authorName: 'Autor Desconocido',
  likes: 0,
  commentsCount: 0,
  publicationDate: new Date().toISOString(),
};

export default BlogPreviewCard;