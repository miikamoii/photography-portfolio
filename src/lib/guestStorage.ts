// src/lib/guestStorage.ts
import bcrypt from "bcrypt";

type GuestUser = {
  username: string;
  passwordHash: string;
  expiresAt: number;
  createdAt: number;
};

const guestStorage = new Map<string, GuestUser>();
export const MAX_GUESTS = 10;
export const EXPIRATION_MS = 60 * 60 * 1000; // 1 hour

export async function addGuest(username: string, password: string) {
  cleanupExpiredGuests();

  let removedOldest = false;

  if (guestStorage.size >= MAX_GUESTS) {
    removeOldestGuest();
    removedOldest = true;
  }

  if (guestStorage.has(username)) {
    throw new Error("Username already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const expiresAt = Date.now() + EXPIRATION_MS;
  const createdAt = Date.now();

  guestStorage.set(username, { username, passwordHash, expiresAt, createdAt });
  return removedOldest;
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

function removeOldestGuest() {
  let oldestKey: string | null = null;
  let oldestTime = Infinity;

  for (const [key, user] of guestStorage) {
    if (user.createdAt < oldestTime) {
      oldestTime = user.createdAt;
      oldestKey = key;
    }
  }

  if (oldestKey) guestStorage.delete(oldestKey);
}

export { guestStorage };
