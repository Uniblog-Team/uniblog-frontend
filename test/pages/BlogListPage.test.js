/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import BlogListPage from '../../src/pages/bloglistpage/BlogListPage'; 
import { mockBlogPostsData } from '../../src/data/blogData';

// Mock para useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock del componente hijo CategoryFilter
jest.mock('../../src/components/CategoryFilter', () => {
  // Obtenemos los datos que necesitamos aquí
  const { blogCategories } = require('../../src/data/blogData'); 
  
  // Devolvemos el componente mock como una función con nombre para el linter de React
  const MockCategoryFilter = ({ onCategoryChange }) => (
    <div data-testid="category-filter">
      {blogCategories.map(cat => (
        <button key={cat.id} onClick={() => onCategoryChange(cat.id)}>
          {cat.name}
        </button>
      ))}
    </div>
  );
  MockCategoryFilter.displayName = 'MockCategoryFilter';
  return MockCategoryFilter;
});


// Mock del componente hijo BlogPreviewCard (sin cambios, ya que no usaba variables externas)
jest.mock('../../src/components/BlogPreviewCard', () => {
    const MockBlogPreviewCard = (props) => (
      <div data-testid="blog-preview-card" onClick={() => props.onClick(props.id)}>
        <h3>{props.title}</h3>
      </div>
    );
    MockBlogPreviewCard.displayName = 'MockBlogPreviewCard';
    return MockBlogPreviewCard;
});


describe('BlogListPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  // --- PRUEBA 1: ESTADO DE CARGA Y MUESTRA EXITOSA ---
  test('renders loading state initially, then displays all blog posts', async () => {
    render(
      <MemoryRouter>
        <BlogListPage />
      </MemoryRouter>
    );

    // 1. Verificar el estado de carga inicial
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText(/cargando blogs.../i)).toBeInTheDocument();

    // 2. Esperar a que los blogs se carguen y se muestren
    const blogCards = await screen.findAllByTestId('blog-preview-card');
    
    // 3. Verificar que el número de tarjetas coincide con los datos mock
    expect(blogCards).toHaveLength(mockBlogPostsData.length);

    // 4. Verificar que el indicador de carga ya no está visible
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    
    // 5. Verificar que el título y el filtro están presentes
    expect(screen.getByText('Nuestros Blogs')).toBeInTheDocument();
    expect(screen.getByTestId('category-filter')).toBeInTheDocument();
  });

  // --- PRUEBA 2: FUNCIONALIDAD DE NAVEGACIÓN AL HACER CLIC EN UN BLOG ---
  test('navigates to the correct blog post page on card click', async () => {
    render(
      <MemoryRouter>
        <BlogListPage />
      </MemoryRouter>
    );

    const blogCards = await screen.findAllByTestId('blog-preview-card');
    
    fireEvent.click(blogCards[0]);

    const firstPostId = mockBlogPostsData[0].id;
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(`/blog/${firstPostId}`);
  });

});