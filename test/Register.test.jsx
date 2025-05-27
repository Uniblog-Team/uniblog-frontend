import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Registro from '../src/pages/register/register';

// Mock para useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Tema básico para ThemeProvider
const theme = createTheme();

describe('Registro Component - Frontend Only', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Router>
          <Registro />
        </Router>
      </ThemeProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // 1. Prueba de renderizado estático
  test('renders all registration elements correctly', () => {
    // Verificar elementos principales
        expect(screen.getByRole('heading', { name: /crea tu cuenta/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirmar contrasena/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /registro/i })).toBeInTheDocument();
        expect(screen.getByText(/o regístrate con/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /registrarse con google/i })).toBeInTheDocument();
        expect(screen.getByText(/¿ya tienes una cuenta\?/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /inicia sesión/i })).toBeInTheDocument();
  });

// 2. Prueba de interacción con formulario
test('allows user to fill registration form fields', () => {
  // Usamos selectores más específicos para evitar ambigüedades
  const nameInput = screen.getByRole('textbox', { name: /nombre completo/i });
  const emailInput = screen.getByRole('textbox', { name: /correo electrónico/i });
  // se usa los data-testid definidos para las contraseñas
  const passwordInput = screen.getByTestId('password-input');
  const confirmPasswordInput = screen.getByTestId('confirm-password-input');
  // Simulamos los cambios
  fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
  // Verificamos los valores
  expect(nameInput.value).toBe('Juan Pérez');
  expect(emailInput.value).toBe('test@example.com');
  expect(passwordInput.value).toBe('password123');
  expect(confirmPasswordInput.value).toBe('password123');
});

// 3. Prueba de envío de formulario
test('submits form and navigates to /inicio', () => {
  // Llenar formulario
  fireEvent.change(screen.getByLabelText(/nombre completo/i), {
    target: { value: 'Juan Pérez' },
  });
  fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/contraseña/i), {
    target: { value: 'password123' },
  });
  fireEvent.change(screen.getByLabelText(/confirmar contrasena/i), {
    target: { value: 'password123' },
  });
  // Enviar formulario - usando selector más específico para evitar conflicto con botón de Google
  const registroButtons = screen.getAllByRole('button', { name: /registro/i });
  const mainRegisterButton = registroButtons.find(button => 
    button.textContent === 'Registro'
  );
  fireEvent.click(mainRegisterButton);
  // Verificar navegación
  expect(mockNavigate).toHaveBeenCalledWith('/inicio');
});

// 4. Prueba de validación de campos requeridos
  test('shows browser validation when submitting empty form', () => {
    // Enviar formulario sin llenar campos
    const submitButton = screen.getByRole('button', { name: /registro/i });
    fireEvent.click(submitButton);
    // Verificar que los campos muestran validación nativa del navegador
    const nameInput = screen.getByLabelText(/nombre completo/i);
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar contrasena/i);  
    expect(nameInput).toBeInvalid();
    expect(emailInput).toBeInvalid();
    expect(passwordInput).toBeInvalid();
    expect(confirmPasswordInput).toBeInvalid();  
    // Verificar que no se ha navegado
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  // 6. Prueba de botón Google
  test('triggers Google registration function', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    fireEvent.click(screen.getByRole('button', { name: /registrarse con google/i }));
    expect(consoleSpy).toHaveBeenCalledWith('Registro con Google');
  });

  

  // 8. Prueba de estructura responsive
  test('applies responsive styles', () => {
    const heading = screen.getByRole('heading', { name: /crea tu cuenta/i });
    const container = heading.closest('[class*="MuiContainer-root"]');
    
    // Verificar que el contenedor tiene las clases de MUI para responsive
    expect(container).toHaveClass('MuiContainer-root');
    expect(container).toHaveClass('MuiContainer-maxWidthSm');
    
    // Verificar que el heading tiene estilos responsive
    expect(heading).toHaveStyle('font-size: 2.125rem');
  });
});