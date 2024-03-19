import { describe, expect, test } from 'vitest';

import PostCodeResolver from '@/lib/PostcodeResolver';

describe('extractPostcodeFromString', () => {
  test('extracts postcodes from a given string', () => {
    expect(PostCodeResolver.extractPostcodeFromString('EX327RB')).toBe(
      'EX327RB',
    );
    expect(PostCodeResolver.extractPostcodeFromString('EX32 7RB')).toBe(
      'EX327RB',
    );
    expect(
      PostCodeResolver.extractPostcodeFromString('Barnstaple, Devon, EX32 7RB'),
    ).toBe('EX327RB');
    expect(
      PostCodeResolver.extractPostcodeFromString('BarnstapleDevonEX327RB'),
    ).toBe('EX327RB');
  });

  test('returns null for non-postcode-like strings', () => {
    expect(PostCodeResolver.extractPostcodeFromString('Devon')).toBe(null);
    expect(
      PostCodeResolver.extractPostcodeFromString(
        'ILOK ABIT LIKE A POSTCODE MAYBE',
      ),
    ).toBe(null);
  });
});
