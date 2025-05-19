// Login.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from '../src/pages/login/Login';

// Mock para useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Tema básico para ThemeProvider
const theme = createTheme();

describe('Login Component - Frontend Only', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Router>
          <Login />
        </Router>
      </ThemeProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // 1. Prueba de renderizado estático
  test('renders all login elements correctly', () => {
    // Verificar elementos principales
    expect(screen.getByRole('heading', { name: /inicia sesión/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByText(/o inicia sesión con/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continuar con google/i })).toBeInTheDocument();
    expect(screen.getByText(/¿olvidaste tu contraseña\?/i)).toBeInTheDocument();
    expect(screen.getByText(/crear cuenta/i)).toBeInTheDocument();
  });

  // 2. Prueba de interacción con formulario
  test('allows user to fill email and password fields', () => {
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  // 3. Prueba de envío de formulario
  test('submits form and navigates to /inicio', () => {
    // Llenar formulario
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password123' },
    });

    // Enviar formulario
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    // Verificar navegación
    expect(mockNavigate).toHaveBeenCalledWith('/inicio');
  });

  // 4. Prueba de validación de campos requeridos
test('shows browser validation when submitting empty form', () => {
  // Enviar formulario sin llenar campos
  const submitButton = screen.getByRole('button', { name: /entrar/i });
  fireEvent.click(submitButton);
  
  // Verificar que los campos muestran validación nativa del navegador
  const emailInput = screen.getByLabelText(/correo electrónico/i);
  const passwordInput = screen.getByLabelText(/contraseña/i);
  
  expect(emailInput).toBeInvalid();
  expect(passwordInput).toBeInvalid();
  
  // Verificar que no se ha navegado (porque la validación nativa previene el submit)
  expect(mockNavigate).not.toHaveBeenCalled();
});

  // 5. Prueba de botón Google
  test('triggers Google login function', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    fireEvent.click(screen.getByRole('button', { name: /continuar con google/i }));
    expect(consoleSpy).toHaveBeenCalledWith('Iniciando sesión con Google');
  });

  // 6. Prueba de navegación a registro
  test('navigates to register page', () => {
    fireEvent.click(screen.getByText(/crear cuenta/i));
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });

  // 7. Prueba de estructura responsive
test('applies responsive styles', () => {
  const heading = screen.getByRole('heading', { name: /inicia sesión/i });
  const container = heading.closest('[class*="MuiContainer-root"]');
  
  // Verificar que el contenedor tiene las clases de MUI para responsive
  expect(container).toHaveClass('MuiContainer-root');
  expect(container).toHaveClass('MuiContainer-maxWidthSm');
  
  // Verificar que el heading tiene estilos responsive
  expect(heading).toHaveStyle('font-size: 2.125rem');
});
});