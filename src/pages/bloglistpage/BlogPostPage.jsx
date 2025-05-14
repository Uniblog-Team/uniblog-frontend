// src/pages/BlogPostPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Para soporte extendido de Markdown (tablas, etc.)
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // O FavoriteIcon si ya le dio like
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper'; // Para enmarcar el contenido del blog

// Función para obtener iniciales si no hay avatar
const getInitials = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

// Ejemplo de contenido Markdown para un blog
const exampleMarkdownContent = `
# Este es el Título Principal del Blog

Bienvenido a este post de ejemplo. Aquí exploraremos varios elementos de Markdown.

## Subtítulo Nivel 2

Puedes usar **texto en negrita**, *texto en cursiva*, o \`código inline\`.

### Subtítulo Nivel 3

Listas:
*   Elemento 1
*   Elemento 2
    *   Sub-elemento 2.1
    *   Sub-elemento 2.2

Listas numeradas:
1.  Primer paso
2.  Segundo paso
3.  Tercer paso

> Esto es una cita en bloque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Bloque de código:
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet('World');
\`\`\`

---

Una línea horizontal también puede ser útil.

[Este es un enlace a Google](https://www.google.com)

![Texto alternativo de imagen](https://via.placeholder.com/600x300?text=Imagen+Ejemplo+Markdown)

Tablas (gracias a remark-gfm):

| Encabezado 1 | Encabezado 2 | Encabezado 3 |
| :----------- | :----------: | -----------: |
| Izquierda    |   Centrado   |      Derecha |
| Celda        |    Celda     |        Celda |

Eso es todo por ahora. ¡Gracias por leer!
`;

// Simulación de datos de blogs (esto vendría de tu API o Zustand store)
const mockBlogPosts = {
  '1': {
    id: '1',
    title: 'Explorando el Universo de React 19',
    authorName: 'Ana Pérez',
    authorAvatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    publicationDate: '2024-07-28T10:00:00Z',
    likes: 125,
    commentsCount: 12,
    contentMarkdown: exampleMarkdownContent, // Contenido en Markdown
    category: 'Desarrollo Web',
  },
  '2': {
    id: '2',
    title: 'Material-UI: Diseño Elegante y Rápido',
    authorName: 'Carlos Ruiz',
    publicationDate: '2024-07-25T14:30:00Z',
    likes: 98,
    commentsCount: 5,
    contentMarkdown: `
# Diseño con Material-UI

Material-UI simplifica la creación de interfaces atractivas y funcionales.

## Componentes Clave

*   **Botones**: Versátiles y personalizables.
*   **Tarjetas**: Ideales para mostrar contenido resumido.
*   **Tipografía**: Consistencia visual en el texto.

\`\`\`jsx
import Button from '@mui/material/Button';

function MyButton() {
  return <Button variant="contained">Hola Mundo</Button>;
}
\`\`\`

¡Es una herramienta poderosa!
    `,
    category: 'Desarrollo Web',
  },
  // Añade más posts si quieres probar con otros IDs
};


const BlogPostPage = () => {
  const { blogId } = useParams(); // Obtiene el ID del blog de la URL
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async (id) => {
      setLoading(true);
      setError(null);
      try {
        // Simulación de llamada a API
        await new Promise(resolve => setTimeout(resolve, 700));
        const postData = mockBlogPosts[id];

        if (postData) {
          setBlog(postData);
        } else {
          setError('Blog no encontrado.');
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError('Error al cargar el blog.');
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlogPost(blogId);
    } else {
      setError('ID de blog no especificado.');
      setLoading(false);
    }
  }, [blogId]);

  const handleGoBack = () => {
    navigate(-1); // Vuelve a la página anterior (lista de blogs)
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h5" color="error">{error}</Typography>
        <IconButton onClick={handleGoBack} sx={{ mt: 2 }}>
          <ArrowBackIcon /> Volver
        </IconButton>
      </Container>
    );
  }

  if (!blog) {
    // Esto no debería pasar si el error maneja bien los casos de "no encontrado"
    return <Typography>Blog no disponible.</Typography>;
  }

  const formattedDate = new Date(blog.publicationDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <IconButton onClick={handleGoBack} sx={{ mb: 2 }}>
        <ArrowBackIcon />
        <Typography variant="button" sx={{ ml: 1 }}>Volver a Blogs</Typography>
      </IconButton>

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        {/* Título */}
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}
        >
          {blog.title}
        </Typography>

        {/* Autor y Fecha */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, color: 'text.secondary', flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: { xs: 0, sm: 3}, mb: {xs: 1, sm: 0} }}>
            {blog.authorAvatarUrl ? (
              <Avatar src={blog.authorAvatarUrl} alt={blog.authorName} sx={{ width: 32, height: 32, mr: 1 }} />
            ) : (
              <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'secondary.main' }}>
                {getInitials(blog.authorName)}
              </Avatar>
            )}
            <Typography variant="subtitle1">{blog.authorName}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarTodayIcon sx={{ fontSize: '1.1rem', mr: 0.5 }} />
            <Typography variant="subtitle2">{formattedDate}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Likes y Comentarios */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2, gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="me gustas" size="small" > {/* Aquí podrías manejar el click para dar like */}
              <FavoriteBorderIcon />
            </IconButton>
            <Typography variant="body1" color="text.secondary" sx={{ ml: 0.5 }}>
              {blog.likes} Me gusta
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="comentarios" size="small"> {/* Link a sección de comentarios o modal */}
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography variant="body1" color="text.secondary" sx={{ ml: 0.5 }}>
              {blog.commentsCount} Comentarios
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Contenido del Blog (Markdown) */}
        <Box
          className="markdown-content" // Clase para estilos específicos si es necesario
          sx={{
            // Estilos base para el contenido Markdown renderizado
            '& h1': { mt: 4, mb: 2, fontSize: '2.5rem' },
            '& h2': { mt: 3.5, mb: 1.5, fontSize: '2rem' },
            '& h3': { mt: 3, mb: 1, fontSize: '1.75rem' },
            '& h4': { mt: 2.5, mb: 1, fontSize: '1.5rem' },
            '& p': { mb: 2, lineHeight: 1.7, fontSize: '1.1rem' },
            '& a': { color: 'primary.main', textDecoration: 'underline' },
            '& img': { maxWidth: '100%', height: 'auto', borderRadius: 1, my: 2 },
            '& pre': { // Estilos para bloques de código
              backgroundColor: 'rgba(0,0,0,0.05)',
              padding: 2,
              borderRadius: 1,
              overflowX: 'auto', // Scroll horizontal para código largo
              my: 2,
            },
            '& code': { // Estilos para código inline y dentro de <pre>
              fontFamily: 'monospace',
              fontSize: '0.95em',
            },
            '& blockquote': {
              borderLeft: (theme) => `4px solid ${theme.palette.grey[400]}`,
              pl: 2,
              ml: 0,
              my: 2,
              fontStyle: 'italic',
              color: 'text.secondary'
            },
            '& ul, & ol': { pl: 3, mb: 2 },
            '& li': { mb: 0.5 },
            '& table': {
              width: '100%',
              borderCollapse: 'collapse',
              my: 2,
              '& th, & td': {
                border: (theme) => `1px solid ${theme.palette.divider}`,
                padding: 1,
                textAlign: 'left',
              },
              '& th': {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            },
            // ... más estilos que necesites
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {blog.contentMarkdown}
          </ReactMarkdown>
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogPostPage;