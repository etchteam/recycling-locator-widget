import random from 'lodash/random';

import { RecyclingMeta } from '@/types/locatorApi';

/**
 * Get a tip for a material or path, falling back to a random generic tip
 */
export default function getTip(
  meta: RecyclingMeta[],
  options: {
    path?: string;
    materialId?: number;
  } = {},
): RecyclingMeta {
  const tips = [];

  if (options.materialId) {
    tips.push(...meta.filter((m) => m.materials.includes(options.materialId)));
  }

  if (options.path) {
    tips.push(...meta.filter((m) => m.path === options.path));
  }

  if (tips.length === 0) {
    tips.push(...meta.filter((m) => m.materials.length === 0 && !m.path));
  }

  return tips[random(0, tips.length - 1)];
}
