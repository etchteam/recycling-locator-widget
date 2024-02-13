import { describe, expect, test } from 'vitest';

import PostCodeResolver from '../PostcodeResolver';

describe('formatPostcode', () => {
  test('removes spaces from postcode', () => {
    expect(PostCodeResolver.formatPostcode('EX3 2 7R B')).toBe('EX327RB');
  });
});
