/**
 * Map FormData, URLSearchParams or object keys to a URLSearchParams object
 */
export default function mapSearchParams(
  keys: string[],
  form: FormData | URLSearchParams | object,
): URLSearchParams {
  const searchParams = new URLSearchParams();

  keys.forEach((key) => {
    const value = (form as FormData).get?.(key) ?? (form as object)?.[key];

    if (value && value !== 'undefined' && value !== 'null') {
      searchParams.append(key, value as string);
    }
  });

  return searchParams;
}
