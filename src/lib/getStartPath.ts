import { RecyclingLocatorAttributes } from '@/index';

export default function getStartPath(
  attributes: RecyclingLocatorAttributes,
): string {
  if (attributes.path) {
    return attributes.path;
  }

  return '/';
}
