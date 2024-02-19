import { RecyclingLocatorAttributes } from '@/index';

import PostcodeResolver from './PostcodeResolver';

export default function getStartPath(
  attributes: RecyclingLocatorAttributes,
): string {
  const { postcode } = attributes;

  if (attributes.path) {
    return attributes.path;
  }

  if (attributes.postcode) {
    return `/${PostcodeResolver.formatPostcode(postcode)}`;
  }

  return '/';
}
