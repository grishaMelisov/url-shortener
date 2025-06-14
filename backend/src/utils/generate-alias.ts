const ALPHABET =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function generateAlias(length = 6): string {
  let alias = '';
  for (let i = 0; i < length; i++) {
    alias += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return alias;
}
