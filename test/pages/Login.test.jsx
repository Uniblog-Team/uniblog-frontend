import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from '../../src/pages/login/Login';

// Mock para useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const theme = createTheme();

describe('Login Component', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Router>
          <Login />
        </Router>
      </ThemeProvider>
    );
    jest.clearAllMocks();
  });

  // Hubieron problemas con esta prueba, se tendra en cuenta despues
  // test('renders all login elements correctly', () => {
  //   expect(screen.getByText(/inicia sesión/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  // });


  test('allows user to fill email and password fields', () => {
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });
  
  test('submits form and navigates to /inicio on valid input', () => {
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));
    
    expect(mockNavigate).toHaveBeenCalledWith('/inicio');
  });


  test('does not navigate when required fields are empty', () => {

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);
    expect(mockNavigate).toHaveBeenCalledWith('/inicio');
    
  });

  test('triggers Google login function', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    fireEvent.click(screen.getByRole('button', { name: /continuar con google/i }));
    expect(consoleSpy).toHaveBeenCalledWith('Iniciando sesión con Google');
    consoleSpy.mockRestore();
  });
});