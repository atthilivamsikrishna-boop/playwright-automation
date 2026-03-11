// util/authToken.ts
import fs from 'fs';

export function getAuthTokenFromStorage() {
  const storage = JSON.parse(fs.readFileSync('storage/auth.json', 'utf-8'));

  // Example if token is in localStorage
  const tokenItem = storage.origins[0].localStorage.find(
    (item: any) => item.name === 'authToken'
  );

  if (!tokenItem) throw new Error('Auth token not found in storage');

  return tokenItem.value;
}