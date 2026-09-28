import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['**/node_modules/', '**/dist/', '**/cdk.out/', '**/coverage/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // The domain is pure: it must not depend on infrastructure, UI or other packages (ADR 0002).
    files: ['packages/domain/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['@aws-sdk/*', 'aws-cdk-lib', 'aws-cdk-lib/*', 'constructs'], message: 'The domain must not depend on AWS.' },
            { group: ['react', 'react-dom', 'react/*'], message: 'The domain must not depend on React.' },
            { group: ['@expense-tracker/*'], message: 'The domain must not depend on other packages.' },
          ],
        },
      ],
    },
  },
);
