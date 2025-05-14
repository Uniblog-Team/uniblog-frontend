// jest.config.js
export default {
    // El entorno de prueba que se utilizará para las pruebas
    testEnvironment: 'jest-environment-jsdom',
  
    // Módulos que Jest debe transformar con Babel
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest', // Usar babel-jest para archivos .js y .jsx
    },
  
    // Extensiones de archivo que Jest buscará
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  
    // Ignorar transformaciones para node_modules excepto para módulos ES específicos si es necesario
    // Por ahora, podemos empezar sin esto y añadirlo si surgen problemas con módulos ES en dependencias.
    // transformIgnorePatterns: [
    //   '/node_modules/(?!nombre-del-modulo-es).+\\.js$'
    // ],
  
    // Configuración para manejar módulos de CSS, imágenes, etc. (muy útil con Vite/React)
    moduleNameMapper: {
      // Mocks para archivos de estilos
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      // Mocks para archivos de imagen u otros assets
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
    },
  
    // Setup para ejecutar código antes de cada archivo de test (opcional, pero útil para polyfills o mocks globales)
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Descomenta si creas este archivo
  
    // Configuración para la cobertura de código
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["json", "lcov", "text", "clover"], // lcov es importante para SonarCloud
    // Especifica de dónde recoger la información de cobertura (tus archivos fuente)
    collectCoverageFrom: [
      "src/**/*.{js,jsx}", // Ajusta esto a la ubicación de tus archivos fuente
      "!src/**/*.test.{js,jsx}", // No incluyas archivos de test en el cálculo de cobertura en sí
      "!src/test/**/*.{js,jsx}", // Excluye la carpeta de test de la cobertura
      "!src/main.jsx", // Usualmente no se testea el archivo principal de entrada
      "!src/vite-env.d.ts" // Si tuvieras este archivo (más común en TS)
    ],
  
    // Patrones para los archivos de test
    testMatch: [
      "**/__tests__/**/*.[jt]s?(x)", // Archivos en carpetas __tests__
      "**/?(*.)+(spec|test).[tj]s?(x)" // Archivos con .spec.js/jsx o .test.js/jsx
    ],
  
    // Verbose output
    verbose: true,
  };