// src/features/auth/utils/isAdmin.ts
export function isAdmin(uid: string): boolean {
  return uid === process.env.NEXT_PUBLIC_ADMIN_UID
}
