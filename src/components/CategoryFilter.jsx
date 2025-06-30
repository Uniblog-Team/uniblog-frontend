import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'; // Para darle un fondo y elevación

// Categorías de ejemplo (podrías obtenerlas de una API o definirlas estáticamente)
const exampleCategories = [
  { id: 'all', name: 'Todos' },
  { id: 'tecnologia', name: 'Tecnología' },
  { id: 'desarrollo-web', name: 'Desarrollo Web' },
  { id: 'productividad', name: 'Productividad' },
  { id: 'diseno-ux', name: 'Diseño UX/UI' },
  { id: 'inteligencia-artificial', name: 'Inteligencia Artificial' },
  { id: 'noticias', name: 'Noticias' },
];

const CategoryFilter = ({ categories = exampleCategories, onCategoryChange, initialCategory = 'all' }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const handleChange = (event, newValue) => {
    setSelectedCategory(newValue);
    onCategoryChange(newValue); // Llama a la función del padre con el ID de la categoría
  };

  return (
    <Paper elevation={1} sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={selectedCategory}
          onChange={handleChange}
          variant="scrollable" // Permite scroll horizontal si hay muchas categorías
          scrollButtons="auto" // Muestra botones de scroll si es necesario
          allowScrollButtonsMobile
          aria-label="Filtro de categorías del blog"
          indicatorColor="primary"
          textColor="primary"
          sx={{
            '& .MuiTabs-flexContainer': {
              justifyContent: { xs: 'flex-start', sm: 'center' }, // Centra en pantallas más grandes
            },
            '& .MuiTab-root': {
              minWidth: 100, // Ancho mínimo por pestaña para mejor legibilidad
              textTransform: 'none', // Evita que el texto de las pestañas sea TODO MAYÚSCULAS
              fontWeight: 500,
            },
          }}
        >
          {categories.map((category) => (
            <Tab key={category.id} label={category.name} value={category.id} />
          ))}
        </Tabs>
      </Box>
    </Paper>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onCategoryChange: PropTypes.func.isRequired,
  initialCategory: PropTypes.string,
};

CategoryFilter.defaultProps = {
  categories: exampleCategories,
  initialCategory: 'all',
};

export default CategoryFilter;