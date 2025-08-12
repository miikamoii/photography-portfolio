// src/app/api/debug-guests/route.ts
import { NextResponse } from "next/server";
import { guestStorage } from "@/lib/guestStorage";

export async function GET() {
  const now = Date.now();

  const activeUsers = Array.from(guestStorage.values())
    .filter((user) => user.expiresAt > now)
    .map((user) => {
      const minutesLeft = Math.round((user.expiresAt - now) / 60000);
      return {
        username: user.username,
        expiresInMinutes: minutesLeft,
      };
    });

  return NextResponse.json(activeUsers);
}
