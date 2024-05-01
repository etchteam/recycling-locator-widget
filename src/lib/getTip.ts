import * as Sentry from '@sentry/browser';
import random from 'lodash/random';

import { RecyclingMeta } from '@/types/locatorApi';

import LocatorApi from './LocatorApi';

/**
 * Get a tip for a material or path, falling back to a random generic tip
 */
export default function getTip(
  meta: RecyclingMeta[],
  options: {
    path?: string;
    materialId?: string | number;
  } = {},
): RecyclingMeta {
  const tips = [];

  if (options.materialId) {
    tips.push(
      ...meta.filter((m) => m.materials.includes(Number(options.materialId))),
    );
  }

  if (options.path) {
    tips.push(...meta.filter((m) => m.path === options.path));
  }

  if (tips.length === 0) {
    tips.push(...meta.filter((m) => m.materials.length === 0 && !m.path));
  }

  return tips[random(0, tips.length - 1)] ?? null;
}

/**
 * Log and ignore all tip errors because not having the content isn't a blocker
 */
function handleTipError(error: Error) {
  Sentry.captureException(error, {
    tags: { route: 'Get tip' },
  });
}

export async function getTipByPath(path: string) {
  try {
    const meta = await LocatorApi.get<RecyclingMeta[]>('recycling-meta');
    return getTip(meta, { path });
  } catch (error) {
    handleTipError(error);
    return Promise.resolve(null);
  }
}

export async function getTipByMaterial(materialId: string) {
  try {
    const meta = await LocatorApi.get<RecyclingMeta[]>(
      'recycling-meta?categories=HINT',
    );
    return getTip(meta, { materialId });
  } catch (error) {
    handleTipError(error);
    return Promise.resolve(null);
  }
}
