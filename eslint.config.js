import { builtinModules } from 'node:module';
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

const nodeBuiltins = [...builtinModules, ...builtinModules.map((name) => `node:${name}`)];

export default defineConfig(
  { ignores: ['**/node_modules/', '**/dist/', '**/cdk.out/', '**/coverage/'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    // The domain is pure business logic: infrastructure, UI and I/O reach it only through ports.
    files: ['packages/domain/**/*.{ts,tsx,mts,cts}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: nodeBuiltins.map((name) => ({ name, message: 'The domain must not do I/O; depend on a port instead.' })),
          patterns: [
            {
              group: ['@aws-sdk/*', 'aws-sdk', 'aws-sdk/*', 'aws-cdk-lib', 'aws-cdk-lib/*', 'constructs', '@aws-lambda-powertools/*', '@types/aws-lambda'],
              message: 'The domain must not depend on AWS.',
            },
            { group: ['react', 'react/*', 'react-dom', 'react-dom/*'], message: 'The domain must not depend on React.' },
            { group: ['@expense-tracker/*'], message: 'The domain must not depend on other packages.' },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        { selector: 'ImportExpression', message: 'The domain must not use dynamic imports; they bypass the import restrictions.' },
      ],
    },
  },
);
