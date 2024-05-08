/**
 * Create a URLSearchParams object for the given keys
 * Accepts FormData, URLSearchParams or an object to take values from
 */
export default function createSearchParams(
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
