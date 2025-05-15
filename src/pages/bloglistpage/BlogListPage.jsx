// src/pages/BlogListPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid2 } from '@mui/material';
import CategoryFilter from '../../components/CategoryFilter';
import BlogPreviewCard from '../../components/BlogPreviewCard';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


// Simulación de datos con categorías
const mockBlogData = [
    {
        id: '1',
        title: 'Explorando el Universo de React 19',
        authorName: 'Ana Pérez',
        authorAvatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        imageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 125,
        commentsCount: 12,
        publicationDate: '2024-07-28T10:00:00Z',
        categoryId: 'desarrollo-web',
      },
      {
        id: '2',
        title: 'Material-UI: Diseño Elegante y Rápido',
        authorName: 'Carlos Ruiz',
        // Sin authorAvatarUrl, usará iniciales
        imageUrl: 'https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 98,
        commentsCount: 5,
        publicationDate: '2024-07-25T14:30:00Z',
        categoryId: 'desarrollo-web',
      },
      {
        id: '3',
        title: 'Zustand: Manejo de Estado Simple y Potente',
        authorName: 'Paulo Gómez',
        authorAvatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8M3x8bGFwdG9wJTIwY29kZXxlbnwwfHx8fDE2MTg0NDY2MTI&ixlib=rb-1.2.1&q=80&w=1080',
        likes: 210,
        commentsCount: 22,
        publicationDate: '2024-07-20T09:15:00Z',
        categoryId: 'tecnologia',
      },
       {
        id: '4',
        title: 'Un título de blog muy largo que debería mostrarse en dos líneas como máximo y luego cortarse con puntos suspensivos para que no ocupe demasiado espacio verticalmente en la tarjeta de previsualización del blog.',
        authorName: 'Escritor Detallista',
        imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 75,
        commentsCount: 8,
        publicationDate: '2024-06-15T18:00:00Z',
        categoryId: 'diseno-ux',
      }
];

// Puedes definir tus categorías aquí o importarlas desde el componente CategoryFilter si las centralizas allí
const blogCategories = [
  { id: 'all', name: 'Todos' },
  { id: 'tecnologia', name: 'Tecnología' },
  { id: 'desarrollo-web', name: 'Desarrollo Web' },
  { id: 'productividad', name: 'Productividad' }, // Sin blogs en el mock data
  { id: 'diseno-ux', name: 'Diseño UX/UI' },
  { id: 'inteligencia-artificial', name: 'Inteligencia Artificial' },

];


const BlogListPage = () => {
  const [allBlogs, setAllBlogs] = useState([]); // Todos los blogs cargados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all'); // Categoría seleccionada
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
        // En una app real, cargarías todos los blogs aquí
        setAllBlogs(mockBlogData);
        setError(null);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError('No se pudieron cargar los blogs. Intenta más tarde.');
        setAllBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    // Aquí podrías hacer una nueva llamada a la API si el backend soporta filtrado por categoría
    // o filtrar en el frontend como hacemos ahora.
    console.log(`Categoría seleccionada: ${categoryId}`);
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  // Filtra los blogs basándose en la categoría seleccionada
  // Usamos useMemo para optimizar y no recalcular en cada render a menos que cambien las dependencias
  const filteredBlogs = useMemo(() => {
    if (selectedCategory === 'all') {
      return allBlogs;
    }
    return allBlogs.filter(blog => blog.categoryId === selectedCategory);
  }, [allBlogs, selectedCategory]);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <CircularProgress />
        <Typography>Cargando blogs...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
        Nuestros Blogs
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate('/crear')}
        >
        Crear nuevo artículo
        </Button>
      </Box>

      {/* Filtro de Categorías */}
      <CategoryFilter
        categories={blogCategories} // Pasa las categorías
        onCategoryChange={handleCategoryChange}
        initialCategory={selectedCategory}
      />

      {filteredBlogs.length === 0 && !loading ? (
        <Typography align="center" sx={{ mt: 4 }}>
          No hay blogs en esta categoría por el momento.
        </Typography>
      ) : (
        <Grid2 container spacing={3} justifyContent="center">
          {filteredBlogs.map((blog) => (
            <Grid2 item key={blog.id} xs={12} sm={6} md={4} lg={4} display="flex" justifyContent="center">
              <BlogPreviewCard
                id={blog.id}
                imageUrl={blog.imageUrl}
                title={blog.title}
                authorName={blog.authorName}
                authorAvatarUrl={blog.authorAvatarUrl}
                likes={blog.likes}
                commentsCount={blog.commentsCount}
                publicationDate={blog.publicationDate}
                onClick={handleBlogClick}
              />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Container>
  );
};

export default BlogListPage;