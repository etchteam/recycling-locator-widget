import { LocalAuthorityProperty } from '@/types/locatorApi';

/**
 * If there's a dry scheme return its name
 * otherwise return the name of the first scheme
 */
export default function getPropertyDisplayName(
  property: LocalAuthorityProperty[],
): string {
  const dryScheme = property.find((scheme) => scheme.type === 'Dry');
  return dryScheme?.name ?? property[0].name;
}
