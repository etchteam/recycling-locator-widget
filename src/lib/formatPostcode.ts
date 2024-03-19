export default function formatPostcode(postcode: string) {
  const INCODE_REGEX = /\d[a-z]{2}$/i;
  const trimmed = postcode.replace(/\s/g, '').toUpperCase();

  const incode = trimmed.match(INCODE_REGEX);
  const outcode = trimmed.replace(INCODE_REGEX, '');

  if (!outcode || !incode?.[0]) {
    return postcode;
  }

  return `${outcode} ${incode[0]}`;
}
