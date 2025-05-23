# Uniblog frontend

## Cómo ejecutar la app (Vite + React)

Este proyecto utiliza **[Vite](https://vitejs.dev/)** como entorno de desarrollo rápido y **React** como biblioteca principal de interfaz.

### Instalación de dependencias

Asegúrate de tener [Node.js](https://nodejs.org/) instalado (versión recomendada: 18+). Luego ejecuta:

```bash
npm install
```

Esto instalará todas las dependencias definidas en `package.json`.

---
<!-- Trigger test -->
### Correr la aplicación en desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Esto levantará la app en `http://localhost:5173` por defecto. El navegador se recargará automáticamente al hacer cambios.

---

### Linting del código

Este proyecto puede incluir herramientas como **ESLint** y **Prettier** para mantener la calidad del código.

Para correr el linter:

```bash
npm run lint
```

---

### Ejecutar pruebas

Para ejecutar las pruebas mediante **jest** usar:

```bash
npm run test
```

Para modo interactivo con recarga automática:

```bash
npm run test:watch
```

