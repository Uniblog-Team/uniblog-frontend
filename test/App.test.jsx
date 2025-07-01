import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App.jsx';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  return render(ui, {

    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[route]}>
        {children}
      </MemoryRouter>
    ),
  });
};

describe('App Routing', () => {
  test('debería renderizar la página de Login en la ruta /login', async () => {
    renderWithRouter(<App />, { route: '/login' });

    const loginTitle = await screen.findByText(/entrar/i);
    expect(loginTitle).toBeInTheDocument();
  });

  test('debería renderizar la página de Registro en la ruta /register', async () => {
    renderWithRouter(<App />, { route: '/register' });

    const registerTitle = await screen.findByText(/crea tu cuenta/i);
    expect(registerTitle).toBeInTheDocument();
  });

  test('debería renderizar la página Home en la ruta raíz /', async () => {
    renderWithRouter(<App />, { route: '/' });

    const homeTitle = await screen.findByRole('heading', { name: /uniblog/i });
    expect(homeTitle).toBeInTheDocument();
  });
});