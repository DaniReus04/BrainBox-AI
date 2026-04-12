const DEFAULT_DAYS = 365;

export function setCookie(name: string, value: string, days = DEFAULT_DAYS) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  // biome-ignore lint/suspicious/noDocumentCookie: cookie utility requires direct document.cookie access
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function removeCookie(name: string) {
  // biome-ignore lint/suspicious/noDocumentCookie: cookie utility requires direct document.cookie access
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}
