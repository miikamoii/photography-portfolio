// src/lib/guestStorage.ts
import bcrypt from "bcrypt";

type GuestUser = {
  username: string;
  passwordHash: string;
  expiresAt: number;
};

const guestStorage = new Map<string, GuestUser>();
export const MAX_GUESTS = 10;
export const EXPIRATION_MS = 60 * 60 * 1000; // 1 hour

export async function addGuest(username: string, password: string) {
  cleanupExpiredGuests();

  if (guestStorage.size >= MAX_GUESTS) {
    throw new Error("Maximum number of guest users reached");
  }

  if (guestStorage.has(username)) {
    throw new Error("Username already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const expiresAt = Date.now() + EXPIRATION_MS;

  guestStorage.set(username, { username, passwordHash, expiresAt });
  return true;
}

export async function validateGuest(username: string, password: string) {
  cleanupExpiredGuests();

  const user = guestStorage.get(username);
  if (!user) return false;

  const match = await bcrypt.compare(password, user.passwordHash);
  if (match) {
    user.expiresAt = Date.now() + EXPIRATION_MS;
    return { username: user.username };
  }
  return false;
}

function cleanupExpiredGuests() {
  const now = Date.now();
  for (const [key, user] of guestStorage) {
    if (user.expiresAt <= now) {
      guestStorage.delete(key);
    }
  }
}

export { guestStorage };
