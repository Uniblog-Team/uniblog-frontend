// src/components/BlogPostContent.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Paper from '@mui/material/Paper';
import { getInitials } from '../data/blogData';

const BlogPostContent = ({ blog }) => {
  if (!blog) return null;

  const formattedDate = new Date(blog.publicationDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
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
            <Avatar data-testid="author-initials-avatar" sx={{ width: 32, height: 32, mr: 1, bgcolor: 'secondary.main' }}>
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
          <IconButton aria-label="me gustas" size="small" >
            <FavoriteBorderIcon />
          </IconButton>
          <Typography variant="body1" color="text.secondary" sx={{ ml: 0.5 }}>
            {blog.likes} Me gusta
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton aria-label="comentarios" size="small">
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
        className="markdown-content"
        sx={{
          '& h1': { mt: 4, mb: 2, fontSize: '2.5rem' },
          '& h2': { mt: 3.5, mb: 1.5, fontSize: '2rem' },
          '& h3': { mt: 3, mb: 1, fontSize: '1.75rem' },
          '& h4': { mt: 2.5, mb: 1, fontSize: '1.5rem' },
          '& p': { mb: 2, lineHeight: 1.7, fontSize: '1.1rem' },
          '& a': { color: 'primary.main', textDecoration: 'underline' },
          '& img': { maxWidth: '100%', height: 'auto', borderRadius: 1, my: 2 },
          '& pre': {
            backgroundColor: 'rgba(0,0,0,0.05)',
            padding: 2,
            borderRadius: 1,
            overflowX: 'auto',
            my: 2,
          },
          '& code': {
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
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.contentMarkdown}
        </ReactMarkdown>
      </Box>
    </Paper>
  );
};

export default BlogPostContent;