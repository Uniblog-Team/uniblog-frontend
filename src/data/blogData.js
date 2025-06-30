// src/data/blogData.js

// Contenido Markdown de ejemplo
const exampleMarkdownContent1 = `
# Este es el Título Principal del Blog

Bienvenido a este post de ejemplo. Aquí exploraremos varios elementos de Markdown.

## Subtítulo Nivel 2

Puedes usar **texto en negrita**, *texto en cursiva*, o \`código inline\`.

### Subtítulo Nivel 3

Listas:
*   Elemento 1
*   Elemento 2
    *   Sub-elemento 2.1
    *   Sub-elemento 2.2

Listas numeradas:
1.  Primer paso
2.  Segundo paso
3.  Tercer paso

> Esto es una cita en bloque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Bloque de código:
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet('World');
\`\`\`

---

Una línea horizontal también puede ser útil.

[Este es un enlace a Google](https://www.google.com)

![Texto alternativo de imagen](https://via.placeholder.com/600x300?text=Imagen+Ejemplo+Markdown)

Tablas (gracias a remark-gfm):

| Encabezado 1 | Encabezado 2 | Encabezado 3 |
| :----------- | :----------: | -----------: |
| Izquierda    |   Centrado   |      Derecha |
| Celda        |    Celda     |        Celda |

Eso es todo por ahora. ¡Gracias por leer!
`;

const exampleMarkdownContent2 = `
# Diseño con Material-UI

Material-UI simplifica la creación de interfaces atractivas y funcionales.

## Componentes Clave

*   **Botones**: Versátiles y personalizables.
*   **Tarjetas**: Ideales para mostrar contenido resumido.
*   **Tipografía**: Consistencia visual en el texto.

\`\`\`jsx
import Button from '@mui/material/Button';

function MyButton() {
  return <Button variant="contained">Hola Mundo</Button>;
}
\`\`\`

¡Es una herramienta poderosa!
`;

const exampleMarkdownContent3 = `
# Zustand: Simple y Poderoso

Zustand ofrece una forma minimalista de manejar el estado global en React.

## Características

*   Poco boilerplate.
*   Fácil de aprender.
*   Se integra bien con React Suspense y concurrencia.

\`\`\`javascript
import { create } from 'zustand'

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
\`\`\`
`;

const exampleMarkdownContent4 = `
# La Importancia de los Títulos Concisos

Aunque a veces queremos ser descriptivos, un título debe ser directo. Este post discute cómo balancear detalle y brevedad.

## Problemas con Títulos Largos

*   **SEO:** Pueden ser truncados por motores de búsqueda.
*   **UI:** Rompen diseños en tarjetas y listas.
*   **Atención:** Los usuarios pueden perder interés.

Este post explora estrategias para escribir títulos efectivos.
`;


// Plantilla base de datos de blogs (unificada)
export const mockBlogPostsData = [
  {
    id: '1',
    title: 'Explorando el Universo de React 19',
    authorName: 'Ana Pérez',
    authorAvatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    publicationDate: '2024-07-28T10:00:00Z',
    likes: 125,
    commentsCount: 12,
    contentMarkdown: exampleMarkdownContent1,
    imageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    categoryId: 'desarrollo-web',
    categoryName: 'Desarrollo Web', // Nombre legible para mostrar si es necesario
  },
  {
    id: '2',
    title: 'Material-UI: Diseño Elegante y Rápido',
    authorName: 'Carlos Ruiz',
    // authorAvatarUrl: '', // Omitido para usar iniciales
    publicationDate: '2024-07-25T14:30:00Z',
    likes: 98,
    commentsCount: 5,
    contentMarkdown: exampleMarkdownContent2,
    imageUrl: 'https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    categoryId: 'desarrollo-web',
    categoryName: 'Desarrollo Web',
  },
  {
    id: '3',
    title: 'Zustand: Manejo de Estado Simple y Potente',
    authorName: 'Paulo Gómez',
    authorAvatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    publicationDate: '2024-07-20T09:15:00Z',
    likes: 210,
    commentsCount: 22,
    contentMarkdown: exampleMarkdownContent3,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8M3x8bGFwdG9wJTIwY29kZXxlbnwwfHx8fDE2MTg0NDY2MTI&ixlib=rb-1.2.1&q=80&w=1080',
    categoryId: 'tecnologia',
    categoryName: 'Tecnología',
  },
  {
    id: '4',
    title: 'Un título de blog muy largo que debería mostrarse en dos líneas como máximo y luego cortarse con puntos suspensivos para que no ocupe demasiado espacio verticalmente en la tarjeta de previsualización del blog.',
    authorName: 'Escritor Detallista',
    publicationDate: '2024-06-15T18:00:00Z',
    likes: 75,
    commentsCount: 8,
    contentMarkdown: exampleMarkdownContent4,
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    categoryId: 'diseno-ux',
    categoryName: 'Diseño UX/UI',
  }
];

export const blogCategories = [
  { id: 'all', name: 'Todos' },
  { id: 'tecnologia', name: 'Tecnología' },
  { id: 'desarrollo-web', name: 'Desarrollo Web' },
  { id: 'productividad', name: 'Productividad' },
  { id: 'diseno-ux', name: 'Diseño UX/UI' },
  { id: 'inteligencia-artificial', name: 'Inteligencia Artificial' },
];

// Función para obtener iniciales si no hay avatar
export const getInitials = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};