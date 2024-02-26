import { expect, test, beforeAll } from 'vitest';

import provideI18n from '../utils/providei18n';
import containerName from '@/lib/containerName';

beforeAll(async () => {
  await provideI18n();
});

test('returns displayName if no colours are provided', () => {
  expect(containerName({ displayName: 'Box' })).toBe('Box');
});

test('ignores colour values that don’t have a translation', () => {
  expect(
    containerName({
      displayName: 'Box',
      bodyColour: 'red',
      lidColour: 'red',
    }),
  ).toBe('Box');
});

test('returns bodyColour + displayName if provided', () => {
  expect(containerName({ displayName: 'Box', bodyColour: '#4f4f4f' })).toBe(
    'Black Box',
  );
});

test('returns bodyColour + displayName if the lid and body colour is the same', () => {
  expect(
    containerName({
      displayName: 'Box',
      bodyColour: '#4f4f4f',
      lidColour: '#4f4f4f',
    }),
  ).toBe('Black Box');
});

test('returns bodyColour + lidColour + displayName if provided', () => {
  expect(
    containerName({
      displayName: 'Box',
      bodyColour: '#4f4f4f',
      lidColour: '#2d9cdb',
    }),
  ).toBe('Black and Blue Box');
});
