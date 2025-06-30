import React, { useState } from 'react';
import { Box, TextField, Button, Alert, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../layout/auth/AuthLayout';
import {
  AuthFormContainer,
  AuthTitle,
  PrimaryAuthButton,
  GoogleAuthButton,
  Separator,
} from '../../components/auth/AuthUI.jsx';

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'password' || name === 'confirmPassword') {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) return;
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    navigate('/inicio');
  };

  const handleGoogleRegister = () => {
    console.log('Registro con Google');
  };

  return (
    <AuthLayout>
      <AuthFormContainer maxWidth="sm">
        <AuthTitle>Crea tu cuenta</AuthTitle>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="nombre" label="Nombre completo" variant="outlined" fullWidth required value={formData.nombre} onChange={handleChange} inputProps={{ 'data-testid': 'nombre-input' }} />
          <TextField name="email" label="Correo electrónico" variant="outlined" fullWidth type="email" required value={formData.email} onChange={handleChange} inputProps={{ 'data-testid': 'email-input' }} />
          <TextField name="password" label="Contraseña" variant="outlined" fullWidth type="password" required value={formData.password} onChange={handleChange} inputProps={{ 'data-testid': 'password-input' }} />
          <TextField name="confirmPassword" label="Confirmar contraseña" variant="outlined" fullWidth type="password" required value={formData.confirmPassword} onChange={handleChange} inputProps={{ 'data-testid': 'confirm-password-input' }} />
          
          <PrimaryAuthButton type="submit" variant="contained" fullWidth data-testid="register-button">
            Registro
          </PrimaryAuthButton>
        </Box>

        <Separator text="o regístrate con" />

        <GoogleAuthButton
          variant="contained"
          fullWidth
          onClick={handleGoogleRegister}
          startIcon={<img src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png" alt="Google logo" style={{ width: 20, height: 20 }} />}
          data-testid="google-button"
        >
          Registrarse con Google
        </GoogleAuthButton>

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: 'common.black' }}>
          ¿Ya tienes una cuenta?{' '}
          <Button onClick={() => navigate("/login")} sx={{ textTransform: 'none', p: 0, minWidth: 'auto', color: 'primary.main', fontWeight: 500 }} data-testid="login-button">
            Inicia sesión
          </Button>
        </Typography>
      </AuthFormContainer>
    </AuthLayout>
  );
};

export default Registro;