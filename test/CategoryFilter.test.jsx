import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from '../src/components/CategoryFilter';

// Mock categories
// Categorías simuladas
const mockCategories = [
    { id: 'all', name: 'Todos' },
    { id: 'tecnologia', name: 'Tecnología' },
    { id: 'desarrollo-web', name: 'Desarrollo Web' }
  ];
  
  // Función simulada
  const mockOnCategoryChange = jest.fn();
  
  describe('Componente CategoryFilter', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('se renderiza correctamente con las categorías predeterminadas', () => {
      render(<CategoryFilter onCategoryChange={mockOnCategoryChange} />);
      mockCategories.forEach((category) => {
        expect(screen.getByText(category.name)).toBeInTheDocument();
      });
    });
  
    test('selecciona correctamente la categoría inicial', () => {
      render(<CategoryFilter onCategoryChange={mockOnCategoryChange} initialCategory="tecnologia" />);
      const selectedTab = screen.getByText('Tecnología');
      expect(selectedTab).toHaveAttribute('aria-selected', 'true');
    });
  
    test('llama a onCategoryChange cuando se hace clic en una categoría', () => {
      render(<CategoryFilter onCategoryChange={mockOnCategoryChange} categories={mockCategories} />);
      const techTab = screen.getByText('Tecnología');
      fireEvent.click(techTab);
  
      expect(mockOnCategoryChange).toHaveBeenCalledWith('tecnologia');
    });
  
    test('maneja el cambio a otra categoría', () => {
      render(<CategoryFilter onCategoryChange={mockOnCategoryChange} categories={mockCategories} />);
  
      const webTab = screen.getByText('Desarrollo Web');
      fireEvent.click(webTab);
  
      expect(mockOnCategoryChange).toHaveBeenCalledWith('desarrollo-web');
    });
  });
  