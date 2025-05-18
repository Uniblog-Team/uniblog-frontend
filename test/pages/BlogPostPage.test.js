/* eslint-disable no-undef */
// src/pages/BlogPostPage.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import BlogPostPage from '../../src/pages/bloglistpage/BlogPostPage'; // Ajusta la ruta si es necesario
import { mockBlogPostsData } from '../../src/data/blogData'; // Ajusta la ruta

// Mockear los hooks de react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Importa y conserva el comportamiento predeterminado
  useParams: jest.fn(),
  useNavigate: () => mockNavigate,
}));

// Mockear el componente BlogPostContent para simplificar las pruebas de BlogPostPage
// Solo verificamos que se renderiza y recibe las props correctas
jest.mock('../../src/components/BlogPostContent', () => ({ blog }) => (
    <div data-testid="blog-post-content">
      <h2>{blog.title}</h2>
      {/* Usar contentMarkdown y asegurarse de que exista antes de substring */}
      <p>{blog.contentMarkdown ? blog.contentMarkdown.substring(0, 50) : 'Contenido no disponible'}...</p>
    </div>
  ));


describe('BlogPostPage', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    jest.clearAllMocks();
    // Por defecto, useParams devuelve un ID válido para la mayoría de las pruebas
    // Se puede sobrescribir en pruebas específicas si es necesario
    require('react-router-dom').useParams.mockReturnValue({ blogId: mockBlogPostsData[0].id });
  });

  // --- PRUEBA 1: Carga y muestra exitosa de un post ---
  test('renders loading state initially and then displays blog post content for a valid ID', async () => {
    const existingPost = mockBlogPostsData[0];
    // Aseguramos que useParams devuelva el ID de un post existente
    require('react-router-dom').useParams.mockReturnValue({ blogId: existingPost.id });

    render(
      <MemoryRouter initialEntries={[`/blog/${existingPost.id}`]}>
        <Routes>
          <Route path="/blog/:blogId" element={<BlogPostPage />} />
        </Routes>
      </MemoryRouter>
    );

    // 1. Verificar el estado de carga
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // 2. Esperar a que el contenido del blog se cargue y se muestre
    // Usamos findBy* para elementos que aparecen asíncronamente
    expect(await screen.findByTestId('blog-post-content')).toBeInTheDocument();
    expect(screen.getByText(existingPost.title)).toBeInTheDocument();

    // 3. Verificar que el indicador de carga ya no está
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

    // 4. Verificar que el botón "Volver a Blogs" está presente
    expect(screen.getByRole('button', { name: /Volver a Blogs/i })).toBeInTheDocument();
  });

  // --- PRUEBA 2: Manejo de error cuando el blog no se encuentra ---
  test('renders loading state and then displays "Blog no encontrado" error for a non-existent ID', async () => {
    const nonExistentId = 'non-existent-id';
    require('react-router-dom').useParams.mockReturnValue({ blogId: nonExistentId });

    render(
      <MemoryRouter initialEntries={[`/blog/${nonExistentId}`]}>
        <Routes>
          <Route path="/blog/:blogId" element={<BlogPostPage />} />
        </Routes>
      </MemoryRouter>
    );

    // 1. Verificar el estado de carga
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // 2. Esperar a que aparezca el mensaje de error
    expect(await screen.findByText('Blog no encontrado.')).toBeInTheDocument();

    // 3. Verificar que el indicador de carga ya no está
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

    // 4. Verificar que el botón "Volver" del estado de error está presente
    // El texto puede ser solo "Volver" en el estado de error
    expect(screen.getByRole('button', { name: /Volver/i })).toBeInTheDocument();
  });

  // --- PRUEBA 3: Funcionalidad del botón "Volver" ---
  test('calls navigate(-1) when "Volver a Blogs" button is clicked after successful load', async () => {
    const existingPost = mockBlogPostsData[0];
    require('react-router-dom').useParams.mockReturnValue({ blogId: existingPost.id });
    
    render(
      <MemoryRouter initialEntries={[`/blog/${existingPost.id}`]}>
        <Routes>
          <Route path="/blog/:blogId" element={<BlogPostPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Esperar a que el botón "Volver a Blogs" esté disponible (contenido cargado)
    const goBackButton = await screen.findByRole('button', { name: /Volver a Blogs/i });
    
    fireEvent.click(goBackButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});