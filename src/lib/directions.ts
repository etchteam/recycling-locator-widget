/**
 * Generates a google map directions link for a given origin and destination
 */
export default function directions(origin: string, destination: string) {
  const safeOrigin = encodeURIComponent(origin);
  const safeDestination = encodeURIComponent(destination);
  const uri = 'https://www.google.com/maps/dir/';
  const query = [
    'api=1',
    `origin=${safeOrigin}`,
    `destination=${safeDestination}`,
  ].join('&');

  return `${uri}?${query}`;
}
