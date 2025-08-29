// src/lib/guestStorage.ts
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

const STORAGE_FILE = path.join(process.cwd(), "guest-storage.json");
export const EXPIRATION_MS = 60 * 60 * 1000; // 1 hour
export const MAX_GUESTS = 5;
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

type GuestUser = {
  username: string;
  passwordHash: string;
  expiresAt: number;
  createdAt: number;
};

function readStorage(): Record<string, GuestUser> {
  try {
    if (!fs.existsSync(STORAGE_FILE)) return {};
    const data = fs.readFileSync(STORAGE_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

function writeStorage(storage: Record<string, GuestUser>) {
  fs.writeFileSync(STORAGE_FILE, JSON.stringify(storage, null, 2));
}

function cleanupExpiredGuests(storage: Record<string, GuestUser>) {
  const now = Date.now();
  for (const key in storage) {
    if (storage[key].expiresAt <= now) delete storage[key];
  }
}

function removeOldestGuest(storage: Record<string, GuestUser>) {
  const entries = Object.entries(storage);
  if (!entries.length) return;

  entries.sort((a, b) => a[1].createdAt - b[1].createdAt);
  delete storage[entries[0][0]];
}

export async function addGuest(username: string, password: string) {
  const storage = readStorage();
  cleanupExpiredGuests(storage);

  if (storage[username]) throw new Error("Username already exists");
  if (Object.keys(storage).length >= MAX_GUESTS) removeOldestGuest(storage);

  const passwordHash = await bcrypt.hash(password, 10);
  const now = Date.now();

  storage[username] = {
    username,
    passwordHash,
    createdAt: now,
    expiresAt: now + EXPIRATION_MS,
  };

  writeStorage(storage);
}

export async function validateGuest(username: string, password: string) {
  const storage = readStorage();
  cleanupExpiredGuests(storage);

  const user = storage[username];
  if (!user) return false;

  const match = await bcrypt.compare(password, user.passwordHash);
  if (match) {
    user.expiresAt = Date.now() + EXPIRATION_MS;
    writeStorage(storage);
    return { username: user.username };
  }

  return false;
}

export function getGuestByUsername(username: string) {
  const storage = readStorage();
  cleanupExpiredGuests(storage);
  return storage[username] || null;
}

setInterval(() => {
  const storage = readStorage();
  cleanupExpiredGuests(storage);
  writeStorage(storage);
}, CLEANUP_INTERVAL_MS);

