import { describe, expect, it } from 'vitest';
import { DOMAIN_NAME } from './index.js';

describe('domain package', () => {
  it('is wired into the workspace test run', () => {
    expect(DOMAIN_NAME).toBe('broken-on-purpose');
  });
});
