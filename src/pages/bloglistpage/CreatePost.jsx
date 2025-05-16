import { useState, useEffect, useRef } from 'react';
import { Container, TextField, Typography, Button, Box } from '@mui/material';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  const [error, setError] = useState('');
  const bodyRef = useRef(null);

  const validateTitle = (text) => {
    if (text.length > 100) {
      setError('El título no puede superar los 100 caracteres.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSave = () => {
    if (!validateTitle(title)) return;

    if (!title.trim() || !body.trim()) {
      setError('El título y cuerpo del artículo son obligatorios.');
      return;
    }

    console.log('Guardado manual:', { title, body });
    setLastSaved(new Date().toLocaleTimeString());
    setError('');
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    validateTitle(newTitle);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (title.trim() && body.trim()) {
        console.log('Autoguardado:', { title, body });
        setLastSaved(new Date().toLocaleTimeString());
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [title, body]);

  const formatSelection = (formatFn) => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      const selectedText = selection.toString();
      const formatted = formatFn(selectedText);
      setBody((prev) => prev.replace(selectedText, formatted));
    }
  };

  const formatTextAsHeading = () => {
    formatSelection((text) => `# ${text}`);
  };

  const formatTextAsParagraph = () => {
    formatSelection((text) => `\n\n${text}\n\n`);
  };

  return (
    <Container data-testid="create-post-container">
      <Typography variant="h4" gutterBottom>Crear nuevo artículo</Typography>

      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }} data-testid="error-message">
          {error}
        </Typography>
      )}

      <TextField
        label="Título"
        data-testid="input-title"
        fullWidth
        value={title}
        onChange={handleTitleChange}
        error={!!error && error.includes('título')}
        helperText={title.length > 90 ? `${title.length}/100 caracteres` : ''}
        inputProps={{ maxLength: 100 }}
        sx={{ mb: 2 }}
      />

      <Box sx={{ mb: 1 }}>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={formatTextAsHeading}
          data-testid="format-heading-btn"
          sx={{ mr: 1 }}
        >
          Encabezado
        </Button>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={formatTextAsParagraph}
          data-testid="format-paragraph-btn"
        >
          Párrafo
        </Button>
      </Box>

      <TextField
        label="Cuerpo"
        data-testid="input-body"
        fullWidth
        multiline
        minRows={8}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        inputRef={bodyRef}
      />

      <Button 
        variant="contained" 
        onClick={handleSave} 
        sx={{ mt: 2 }}
        data-testid="save-button"
      >
        Guardar
      </Button>

      {lastSaved && (
        <Typography variant="body2" sx={{ mt: 1 }} data-testid="last-saved">
          Último guardado: {lastSaved}
        </Typography>
      )}
    </Container>
  );
}