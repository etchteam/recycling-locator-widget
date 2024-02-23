import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { expect, test, beforeAll } from 'vitest';

import en from '../../../public/translations/en.json';
import containerName from '@/lib/containerName';

beforeAll(() => {
  return new Promise<void>((resolve) => {
    i18n.use(initReactI18next).init(
      {
        lng: 'en',
        debug: false,
        ns: ['translations'],
        defaultNS: 'translations',
        resources: {
          en: {
            translations: en,
          },
        },
      },
      () => resolve(),
    );
  });
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
