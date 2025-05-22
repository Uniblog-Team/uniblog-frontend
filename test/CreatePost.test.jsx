import { render, screen, fireEvent, act } from '@testing-library/react';
import CreatePost from '../src/pages/bloglistpage/CreatePost';

describe('CreatePost Component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(Date.prototype, 'toLocaleTimeString').mockReturnValue('12:00:00');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('renders the create post form correctly', () => {
    render(<CreatePost />);
    
    expect(screen.getByText('Crear nuevo artículo')).toBeInTheDocument();
    expect(screen.getByTestId('input-title')).toBeInTheDocument();
    expect(screen.getByTestId('input-body')).toBeInTheDocument();
    expect(screen.getByTestId('save-button')).toBeInTheDocument();
    expect(screen.getByText('Guardar')).toBeInTheDocument();
  });

  test('allows entering title and body text', () => {
    render(<CreatePost />);
    
    const titleInput = screen.getByTestId('input-title').querySelector('input');
    const bodyInput = screen.getByTestId('input-body').querySelector('textarea');
    
    fireEvent.change(titleInput, { target: { value: 'Mi artículo de prueba' } });
    fireEvent.change(bodyInput, { target: { value: 'Este es el contenido de mi artículo.' } });
    
    expect(titleInput.value).toBe('Mi artículo de prueba');
    expect(bodyInput.value).toBe('Este es el contenido de mi artículo.');
  });

  test('shows error when title exceeds 100 characters', () => {
    render(<CreatePost />);
    
    const titleInput = screen.getByTestId('input-title').querySelector('input');
    const longTitle = 'a'.repeat(101);
    
    fireEvent.change(titleInput, { target: { value: longTitle } });
    
    expect(screen.getByTestId('error-message')).toHaveTextContent('El título no puede superar los 100 caracteres.');
  });

  test('shows error when saving with empty fields', () => {
    render(<CreatePost />);
    
    const saveButton = screen.getByTestId('save-button');
    fireEvent.click(saveButton);
    
    expect(screen.getByTestId('error-message')).toHaveTextContent('El título y cuerpo del artículo son obligatorios.');
  });

  test('manual save works correctly with valid input', () => {
    render(<CreatePost />);
    
    const titleInput = screen.getByTestId('input-title').querySelector('input');
    const bodyInput = screen.getByTestId('input-body').querySelector('textarea');
    const saveButton = screen.getByTestId('save-button');
    
    fireEvent.change(titleInput, { target: { value: 'Mi artículo' } });
    fireEvent.change(bodyInput, { target: { value: 'Contenido del artículo' } });
    fireEvent.click(saveButton);
    
    expect(screen.getByTestId('last-saved')).toHaveTextContent('Último guardado: 12:00:00');
    expect(console.log).toHaveBeenCalledWith('Guardado manual:', {
      title: 'Mi artículo',
      body: 'Contenido del artículo'
    });
  });

  test('autosave triggers after 30 seconds with valid input', async () => {
    jest.useFakeTimers();
    
    render(<CreatePost />);
    
    const titleInput = screen.getByTestId('input-title').querySelector('input');
    const bodyInput = screen.getByTestId('input-body').querySelector('textarea');
    
    fireEvent.change(titleInput, { target: { value: 'Mi artículo' } });
    fireEvent.change(bodyInput, { target: { value: 'Contenido del artículo' } });
    
    await act(async () => {
      jest.advanceTimersByTime(30000);
    });
    
    expect(screen.getByTestId('last-saved')).toHaveTextContent('Último guardado: 12:00:00');
    expect(console.log).toHaveBeenCalledWith('Autoguardado:', {
      title: 'Mi artículo',
      body: 'Contenido del artículo'
    });
    
    jest.useRealTimers();
  });

  test('autosave does not trigger with empty fields', async () => {
    jest.useFakeTimers();
    
    render(<CreatePost />);
    
    await act(async () => {
      jest.advanceTimersByTime(30000);
    });
    
    expect(screen.queryByTestId('last-saved')).not.toBeInTheDocument();
    expect(console.log).not.toHaveBeenCalledWith('Autoguardado:', expect.anything());
    
    jest.useRealTimers();
  });

  test('formatting text as heading works', () => {
    render(<CreatePost />);
    
    const bodyInput = screen.getByTestId('input-body').querySelector('textarea');
    const headingButton = screen.getByTestId('format-heading-btn');
    
    fireEvent.change(bodyInput, { target: { value: 'Este es un texto' } });
    
    const originalGetSelection = window.getSelection;
    window.getSelection = jest.fn().mockReturnValue({
      toString: () => 'Este es un texto'
    });
    
    fireEvent.click(headingButton);
    
    expect(bodyInput.value).toBe('# Este es un texto');
    
    window.getSelection = originalGetSelection;
  });

  test('formatting text as paragraph works', () => {
    render(<CreatePost />);
    
    const bodyInput = screen.getByTestId('input-body').querySelector('textarea');
    const paragraphButton = screen.getByTestId('format-paragraph-btn');
    
    fireEvent.change(bodyInput, { target: { value: 'Este es un texto' } });
    
    const originalGetSelection = window.getSelection;
    window.getSelection = jest.fn().mockReturnValue({
      toString: () => 'Este es un texto'
    });
    
    fireEvent.click(paragraphButton);
    
    expect(bodyInput.value).toBe('\n\nEste es un texto\n\n');
    
    window.getSelection = originalGetSelection;
  });

  test('validates title on change and displays character count when approaching limit', () => {
    render(<CreatePost />);
    
    const titleInput = screen.getByTestId('input-title').querySelector('input');
    
    const longTitle = 'a'.repeat(95);
    fireEvent.change(titleInput, { target: { value: longTitle } });
    
    expect(screen.getByText('95/100 caracteres')).toBeInTheDocument();
  });

  test('clears error message after fixing validation issues', () => {
    render(<CreatePost />);
    
    const titleInput = screen.getByTestId('input-title').querySelector('input');
    
    const longTitle = 'a'.repeat(101);
    fireEvent.change(titleInput, { target: { value: longTitle } });
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    
    fireEvent.change(titleInput, { target: { value: 'Título corregido' } });
    
    expect(screen.queryByTestId('error-message')).toBeNull();
  });
});