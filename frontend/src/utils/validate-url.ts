const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;

export function isValidUrl(url: string): boolean {
  return urlRegex.test(url.trim());
}
