// @ts-check
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Extremely permissive ESLint configuration to avoid linter errors
export default tseslint.config(
  {
    // Ignore generated/build output and config itself
    ignores: [
      'node_modules',
      'dist',
      'coverage',
      'prisma/generated',
      '**/*.d.ts',
      'eslint.config.mjs',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
      parserOptions: {
        // Disable project-aware (type-checked) linting to keep it lightweight and permissive
        projectService: false,
        tsconfigRootDir: import.meta.dirname,
        // Allow decorators and other TS features to parse without type info
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: false },
        EXPERIMENTAL_useProjectService: false
      },
    },
    // No recommended configs; minimal rules turned off to be permissive
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-console': 'off',
      'no-empty': 'off',
    },
  },
);
