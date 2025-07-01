import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../layout/auth/AuthLayout';
import {
  AuthFormContainer,
  AuthTitle,
  PrimaryAuthButton,
  GoogleAuthButton,
  Separator,
} from '../../components/auth/AuthUI.jsx';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Iniciando sesión:', form);
    navigate('/inicio');
  };

  const handleGoogleLogin = () => {
    console.log('Iniciando sesión con Google');
  };

  return (
    <AuthLayout>
      <AuthFormContainer maxWidth="sm">
        <AuthTitle>Inicia sesión</AuthTitle>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="email" label="Correo electrónico" variant="outlined" fullWidth type="email" required value={form.email} onChange={handleChange} />
          <TextField name="password" label="Contraseña" variant="outlined" fullWidth type="password" required value={form.password} onChange={handleChange} />
          
          <PrimaryAuthButton type="submit" variant="contained" fullWidth>
            Entrar
          </PrimaryAuthButton>
        </Box>

        <Separator text="o inicia sesión con" />

        <GoogleAuthButton
          variant="contained"
          fullWidth
          onClick={handleGoogleLogin}
          startIcon={<img src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png" alt="Google logo" style={{ width: 20, height: 20 }} />}
        >
          Continuar con Google
        </GoogleAuthButton>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button sx={{ textTransform: 'none', p: 0, minWidth: 'auto', color: 'common.black', fontWeight: 500 }}>
            ¿Olvidaste tu contraseña?
          </Button>
          <Button onClick={() => navigate("/register",  { replace: true }) } sx={{ textTransform: 'none', p: 0, minWidth: 'auto', color: 'primary.main', fontWeight: 500 }}>
            Crear cuenta
          </Button>
        </Box>
      </AuthFormContainer>
    </AuthLayout>
  );
};

export default Login;