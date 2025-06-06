// src/features/auth/utils/isAdmin.ts

export const isAdmin = (uid: string | null | undefined): boolean => {
  if (!uid) return false;

  const adminUid = process.env.NEXT_PUBLIC_ADMIN_UID;
  return uid === adminUid;
};
