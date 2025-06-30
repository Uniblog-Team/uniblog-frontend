import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogPostContent from '../../src/components/BlogPostContent'; // Ajusta la ruta
import { getInitials } from '../../src/data/blogData'; // Ajusta la ruta

// Mock react-markdown y remark-gfm
jest.mock('react-markdown', () => {
  return jest.fn(({ children }) => <div data-testid="mocked-markdown">{children}</div>);
});
jest.mock('remark-gfm', () => jest.fn(() => (tree) => tree)); // Mock simple

// Mock data para los tests
const mockBlogFull = {
  id: '1',
  title: 'Título del Blog de Prueba',
  authorName: 'Juan Tester',
  authorAvatarUrl: 'https://example.com/avatar.jpg',
  publicationDate: '2024-01-15T10:00:00Z',
  likes: 150,
  commentsCount: 25,
  contentMarkdown: `
# Cabecera H1
Párrafo de contenido.
*   Item de lista 1
*   Item de lista 2

[Un enlace](https://example.com)
  `,
  categoryName: 'Testing',
};

const mockBlogNoAvatar = {
  ...mockBlogFull,
  id: '2',
  authorName: 'Ana Sin Avatar',
  authorAvatarUrl: null,
};


describe('BlogPostContent Component (with mocked Markdown)', () => {
  afterEach(() => {
    // Limpiar mocks entre tests si es necesario, especialmente si verificas cuántas veces se llamó
    jest.clearAllMocks();
  });

  test('renders null if no blog prop is provided', () => {
    const { container } = render(<BlogPostContent blog={null} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders author initials when avatar URL is not provided', () => {
    render(<BlogPostContent blog={mockBlogNoAvatar} />);

    expect(screen.getByText(mockBlogNoAvatar.authorName)).toBeInTheDocument();
    const initials = getInitials(mockBlogNoAvatar.authorName);
    // El Avatar de MUI renderiza el texto de las iniciales directamente
    expect(screen.getByText(initials)).toBeInTheDocument();
    expect(screen.queryByAltText(mockBlogNoAvatar.authorName)).not.toBeInTheDocument();
  });
  
  test('renders correctly with empty author name for initials (using data-testid)', () => {
    const blogWithNoAuthorName = { ...mockBlogNoAvatar, authorName: '' };
    render(<BlogPostContent blog={blogWithNoAuthorName} />);
    // eslint-disable-next-line no-unused-vars
    const initials = getInitials(''); // Será ''

    const avatarComponent = screen.getByTestId("author-initials-avatar");
    expect(avatarComponent).toBeInTheDocument();
    // El texto dentro del avatar será vacío, lo cual es correcto.
    expect(avatarComponent).toHaveTextContent('');
  });

});