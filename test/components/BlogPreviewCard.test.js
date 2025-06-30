/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import BlogPreviewCard from '../../src/components/BlogPreviewCard';

// Un tema básico de MUI es útil para que los componentes que dependen de él no fallen.
const theme = createTheme();

// Un conjunto de props base para usar en las pruebas. Facilita la reutilización.
const mockProps = {
  id: 'blog-123',
  imageUrl: 'https://example.com/image.jpg',
  title: 'Mi Título de Prueba para el Blog',
  authorName: 'Juan Pérez',
  authorAvatarUrl: 'https://example.com/avatar.jpg',
  likes: 150,
  commentsCount: 25,
  publicationDate: '2024-05-21T10:00:00.000Z',
  onClick: jest.fn(),
};

describe('BlogPreviewCard Component', () => {
  afterEach(() => {
    // Limpia los mocks después de cada prueba
    jest.clearAllMocks();
  });

  // --- PRUEBA 1: RENDERIZADO CON TODOS LOS DATOS ---
  test('renders all data correctly with full props', () => {
    render(
      <ThemeProvider theme={theme}>
        <BlogPreviewCard {...mockProps} />
      </ThemeProvider>
    );

    // Verificar el título
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();

    // Verificar el nombre del autor
    expect(screen.getByText(mockProps.authorName)).toBeInTheDocument();

    // Verificar la imagen principal (el 'name' del rol 'img' es su texto 'alt')
    const mainImage = screen.getByRole('img', { name: mockProps.title });
    expect(mainImage).toHaveAttribute('src', mockProps.imageUrl);

    // Verificar el avatar del autor
    const avatarImage = screen.getByRole('img', { name: mockProps.authorName });
    expect(avatarImage).toHaveAttribute('src', mockProps.authorAvatarUrl);

    // Verificar likes y comentarios
    expect(screen.getByText(mockProps.likes)).toBeInTheDocument();
    expect(screen.getByText(mockProps.commentsCount)).toBeInTheDocument();

    // Verificar la fecha formateada
    expect(screen.getByText('21 de mayo de 2024')).toBeInTheDocument();
  });

  // --- PRUEBA 2: FUNCIONALIDAD DEL ONCLICK ---
  test('calls onClick handler with the correct id when clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <BlogPreviewCard {...mockProps} />
      </ThemeProvider>
    );

    // Hacemos clic en la tarjeta (podemos hacer clic en cualquier elemento dentro de ella)
    fireEvent.click(screen.getByText(mockProps.title));

    // Verificar que la función onClick fue llamada
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    // Verificar que fue llamada con el ID correcto
    expect(mockProps.onClick).toHaveBeenCalledWith(mockProps.id);
  });

  // --- PRUEBA 3: LÓGICA CONDICIONAL DEL AVATAR (INICIALES) ---
  test('renders author initials when authorAvatarUrl is not provided', () => {
    // Creamos props sin la URL del avatar
    const propsWithoutAvatarUrl = { ...mockProps, authorAvatarUrl: undefined };

    render(
      <ThemeProvider theme={theme}>
        <BlogPreviewCard {...propsWithoutAvatarUrl} />
      </ThemeProvider>
    );

    // Verificar que NO hay una imagen de avatar
    expect(screen.queryByRole('img', { name: mockProps.authorName })).not.toBeInTheDocument();

    // Verificar que las iniciales "JP" (de Juan Pérez) están presentes
    expect(screen.getByText('JP')).toBeInTheDocument();
  });

  // --- PRUEBA 4: LÓGICA CONDICIONAL DE LA IMAGEN (PLACEHOLDER) ---
  test('renders placeholder image when imageUrl is not provided', () => {
    const propsWithoutImageUrl = { ...mockProps, imageUrl: undefined };

    render(
      <ThemeProvider theme={theme}>
        <BlogPreviewCard {...propsWithoutImageUrl} />
      </ThemeProvider>
    );

    const mainImage = screen.getByRole('img', { name: mockProps.title });
    // Verificar que el src de la imagen contiene la URL del placeholder
    expect(mainImage.src).toContain('https://via.placeholder.com');
  });


  // --- PRUEBA 5: LÓGICA DE INICIALES PARA NOMBRES SIMPLES ---
  test('getInitials function works correctly for a single name', () => {
    const propsWithSingleName = { ...mockProps, authorName: 'Platón', authorAvatarUrl: undefined };
    render(
      <ThemeProvider theme={theme}>
        <BlogPreviewCard {...propsWithSingleName} />
      </ThemeProvider>
    );
    // Debería mostrar solo la 'P'
    expect(screen.getByText('P')).toBeInTheDocument();
  });
});