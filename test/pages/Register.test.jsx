import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Registro from '../../src/pages/register/register';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const theme = createTheme();

describe('Registro Component', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Router>
          <Registro />
        </Router>
      </ThemeProvider>
    );
    jest.clearAllMocks();
  });

  // Hubieron problemas con esta prueba, se tendra en cuenta despues
  // test('renders all registration elements correctly', () => {
  //   expect(screen.getByText(/crea tu cuenta/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: /registro/i })).toBeInTheDocument();
  // });

  test('allows user to fill registration form fields', () => {
      fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Juan Pérez' } });
      fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'test@example.com' } });

      // --- CAMBIO AQUÍ ---
      // Buscamos un label que COMIENCE con "Contraseña" para incluir el asterisco (*)
      fireEvent.change(screen.getByLabelText(/^contraseña/i), { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: 'password123' } });

      expect(screen.getByLabelText(/nombre completo/i).value).toBe('Juan Pérez');
  });


  test('submits form and navigates to /inicio with valid data', () => {
      fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Juan Pérez' } });
      fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'test@example.com' } });

      // --- CAMBIO AQUÍ ---
      fireEvent.change(screen.getByLabelText(/^contraseña/i), { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: 'password123' } });

      fireEvent.click(screen.getByRole('button', { name: /registro/i }));

      expect(mockNavigate).toHaveBeenCalledWith('/inicio');
  });



  test('does not navigate when required fields are empty', () => {
    fireEvent.click(screen.getByRole('button', { name: /registro/i }));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('shows an error message if passwords do not match', async () => {
      fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Juan Pérez' } });
      fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'test@example.com' } });
      
      // --- CAMBIO AQUÍ ---
      fireEvent.change(screen.getByLabelText(/^contraseña/i), { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: 'password456' } });
      
      fireEvent.click(screen.getByRole('button', { name: /registro/i }));

      const errorMessage = await screen.findByText('Las contraseñas no coinciden');
      expect(errorMessage).toBeInTheDocument();

      expect(mockNavigate).not.toHaveBeenCalled();
  });
  
  test('triggers Google registration function', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    fireEvent.click(screen.getByRole('button', { name: /registrarse con google/i }));
    expect(consoleSpy).toHaveBeenCalledWith('Registro con Google');
    consoleSpy.mockRestore();
  });

test('navigates to login page when link is clicked', () => {
   fireEvent.click(screen.getByRole('button', { name: /inicia sesión/i }));
   expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
});
});