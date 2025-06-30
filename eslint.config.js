import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jestPlugin from 'eslint-plugin-jest';

export default [
  { ignores: ['dist', 'coverage/'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // --- SECCIÓN ESPECÍFICA PARA ARCHIVOS DE TEST CON JEST ---
  {
    files: ['**/*.test.{js,jsx}', '**/*.spec.{js,jsx}', '**/__tests__/**/*.{js,jsx}', 'src/test/**/*.{js,jsx}'], // Aplica esto a los archivos de test
    plugins: {
      jest: jestPlugin, // Registra el plugin
    },
    languageOptions: {
      globals: {
        ...globals.jest, // Importa las globales de Jest
      },
    },
    rules: {
      ...jestPlugin.configs.recommended.rules, // Aplica las reglas recomendadas de Jest
      // Aquí puedes sobrescribir o añadir reglas específicas de Jest
      // 'jest/no-disabled-tests': 'warn',
      // 'jest/no-focused-tests': 'error',
      // 'jest/no-identical-title': 'error',
      // 'jest/prefer-to-have-length': 'warn',
      // 'jest/valid-expect': 'error',
    },
  },
 {
  files: ['jest.setup.js'],
  languageOptions: {
    globals: {
      ...globals.node,
    },
    sourceType: 'module', // Usa módulos ES
  },
},
]
