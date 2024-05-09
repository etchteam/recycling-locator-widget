import { expect, test } from 'vitest';

import mapSearchParams from '@/lib/mapSearchParams';

test('returns a URLSearchParams object for matching FormData keys', () => {
  const form = new FormData();
  form.append('materials', 'plastic');
  form.append('category', null);
  form.append('query', 'bottle');
  form.append('postcode', 'EX327RB');

  const searchParams = mapSearchParams(
    ['materials', 'category', 'query', 'keyNotInForm'],
    form,
  );

  expect(searchParams.has('postcode')).toBe(false);
  expect(searchParams.has('category')).toBe(false);
  expect(searchParams.has('keyNotInForm')).toBe(false);
  expect(searchParams.get('materials')).toBe('plastic');
  expect(searchParams.get('query')).toBe('bottle');
});

test('returns a URLSearchParams object for matching Object keys', () => {
  const obj = {
    materials: 'plastic',
    category: null,
    query: 'bottle',
    postcode: 'EX327RB',
  };

  const searchParams = mapSearchParams(
    ['materials', 'category', 'query', 'keyNotInForm'],
    obj,
  );

  expect(searchParams.has('postcode')).toBe(false);
  expect(searchParams.has('category')).toBe(false);
  expect(searchParams.has('keyNotInForm')).toBe(false);
  expect(searchParams.get('materials')).toBe('plastic');
  expect(searchParams.get('query')).toBe('bottle');
});

test('returns a URLSearchParams object for matching URLSearchParams keys', () => {
  const originalSearchParams = new URLSearchParams();
  originalSearchParams.append('materials', 'plastic');
  originalSearchParams.append('category', null);
  originalSearchParams.append('query', 'bottle');
  originalSearchParams.append('postcode', 'EX327RB');

  const searchParams = mapSearchParams(
    ['materials', 'category', 'query', 'keyNotInForm'],
    originalSearchParams,
  );

  expect(searchParams.has('postcode')).toBe(false);
  expect(searchParams.has('category')).toBe(false);
  expect(searchParams.has('keyNotInForm')).toBe(false);
  expect(searchParams.get('materials')).toBe('plastic');
  expect(searchParams.get('query')).toBe('bottle');
});
