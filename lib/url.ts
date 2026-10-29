// Only allow real http(s) links. Blocks javascript:, data:, etc.
export function normalizeUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  let url: URL;
  try {
    // Prepend https:// if the user left off the scheme.
    url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    return null;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  if (!url.hostname.includes(".")) return null;

  return url.toString();
}
