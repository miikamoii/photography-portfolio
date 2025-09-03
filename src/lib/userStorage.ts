import { Redis } from "@upstash/redis";
import bcrypt from "bcrypt";

export const EXPIRATION_MS = 60 * 60 * 1000; // 1 hour
export const MAX_USERS = 5;

type StoredUser = {
  username: string;
  passwordHash: string;
  createdAt: number;
};

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

function redisKey(username: string) {
  return `user:${username}`;
}

async function getAllUsers(): Promise<StoredUser[]> {
  const keys = await redis.keys("user:*");
  const users = await Promise.all(
    keys.map(async (key) => {
      const data = await redis.get(key);
      if (!data) return null;
      try {
        return typeof data === "string"
          ? (JSON.parse(data) as StoredUser)
          : (data as StoredUser);
      } catch {
        return null;
      }
    })
  );
  return users.filter((u): u is StoredUser => u !== null);
}

async function removeOldestUser() {
  const users = await getAllUsers();
  if (users.length === 0) return;
  users.sort((a, b) => a.createdAt - b.createdAt);
  await redis.del(redisKey(users[0].username));
}

export async function addUser(username: string, password: string) {
  const exists = await redis.exists(redisKey(username));
  if (exists) throw new Error("Username already exists");

  const users = await getAllUsers();
  if (users.length >= MAX_USERS) {
    await removeOldestUser();
  }

  const now = Date.now();
  const passwordHash = await bcrypt.hash(password.trim(), 10);

  const user: StoredUser = {
    username,
    passwordHash,
    createdAt: now,
  };

  await redis.set(redisKey(username), JSON.stringify(user), {
    ex: EXPIRATION_MS / 1000,
  });
}

export async function validateUser(username: string, password: string) {
  const data = await redis.get(redisKey(username));
  if (!data) return false;

  let user: StoredUser;
  try {
    user =
      typeof data === "string"
        ? (JSON.parse(data) as StoredUser)
        : (data as StoredUser);
  } catch {
    return false;
  }

  const match = await bcrypt.compare(password.trim(), user.passwordHash);
  if (!match) return false;

  await redis.expire(redisKey(username), EXPIRATION_MS / 1000);

  return { username: user.username };
}

export async function getUser(username: string) {
  const data = await redis.get(redisKey(username));
  if (!data) return null;

  try {
    return typeof data === "string"
      ? (JSON.parse(data) as StoredUser)
      : (data as StoredUser);
  } catch {
    return null;
  }
}
