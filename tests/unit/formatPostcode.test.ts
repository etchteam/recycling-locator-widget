import { expect, test } from 'vitest';

import formatPostcode from '../../src/lib/formatPostcode';

test('Returns a formatted postcode for a string', () => {
  expect(formatPostcode('eh112jy')).toEqual('EH11 2JY');
});

test('Returns a raw string if the postcode is invalid', () => {
  expect(formatPostcode('gavynmckenzie')).toEqual('gavynmckenzie');
});
