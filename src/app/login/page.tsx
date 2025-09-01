"use client";

import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          ⚠️ This login / register is temporary and only used to showcase user
          authentication for accessing the before/after tool. <br></br> Accounts
          are deleted after 1 hour.
        </p>
        <AuthForm />
      </div>
    </main>
  );
}
