// src/pages/BlogListPage.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid2 } from '@mui/material';
import BlogPreviewCard from '../../components/BlogPreviewCard'; 
import CategoryFilter from '../../components/CategoryFilter';

// Importa los datos unificados
import { mockBlogPostsData, blogCategories } from '../../data/blogData'; // Ajusta la ruta



const BlogListPage = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 700)); // Simular delay
        // Usar los datos mock importados
        setAllBlogs(mockBlogPostsData);
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
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

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

      <CategoryFilter
        categories={blogCategories} // Usar las categorías importadas
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
                // Pasar los props desde el objeto blog unificado
                id={blog.id}
                imageUrl={blog.imageUrl}
                title={blog.title}
                authorName={blog.authorName}
                authorAvatarUrl={blog.authorAvatarUrl}
                likes={blog.likes}
                commentsCount={blog.commentsCount}
                publicationDate={blog.publicationDate}
                onClick={handleBlogClick}
                // categoryId={blog.categoryId} // Si BlogPreviewCard lo necesita
              />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Container>
  );
};

export default BlogListPage;