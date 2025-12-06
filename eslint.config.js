export default defineConfig([
  globalIgnores(['dist']),

  // MAIN CONFIG FOR FRONTEND FILES
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },

  // NODE ENV FOR API FILES
  {
    files: ['api/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
])
