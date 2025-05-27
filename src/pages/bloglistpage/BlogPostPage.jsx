// src/pages/BlogPostPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';

import BlogPostContent from '../../components/BlogPostContent';
import { mockBlogPostsData } from '../../data/blogData';

const BlogPostPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async (id) => {
      setLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 700)); // Simulación API
        
        // Buscar el post en el array unificado
        const postData = mockBlogPostsData.find(p => p.id === id);

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
    navigate(-1);
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

  // No es necesario !blog aquí si el error lo maneja, pero como fallback
  if (!blog) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Typography>Blog no disponible.</Typography>
         <IconButton onClick={handleGoBack} sx={{ mt: 2 }}>
          <ArrowBackIcon /> Volver
        </IconButton>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <IconButton onClick={handleGoBack} sx={{ mb: 2 }}>
        <ArrowBackIcon />
        <Typography variant="button" sx={{ ml: 1 }}>Volver a Blogs</Typography>
      </IconButton>
      <BlogPostContent blog={blog} />
    </Container>
  );
};

export default BlogPostPage;