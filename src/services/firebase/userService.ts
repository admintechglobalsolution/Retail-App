// src/services/firebase/userService.ts

import { equalTo, get, orderByChild, query, ref, set } from "firebase/database";
import { db } from "./firebaseInit";

/**
 * Check if username already exists
 */
export const isUsernameTaken = async (username: string): Promise<boolean> => {
  const q = query(
    ref(db, "users"),
    orderByChild("username"),
    equalTo(username)
  );
  const snapshot = await get(q);
  return snapshot.exists();
};

// backward support for older imports
export const checkUsernameExists = isUsernameTaken;

/**
 * Check if phone already exists
 */
export const isPhoneTaken = async (phone: string): Promise<boolean> => {
  const q = query(ref(db, "users"), orderByChild("phone"), equalTo(phone));
  const snapshot = await get(q);
  return snapshot.exists();
};

/**
 * Check if email already exists
 */
export const isEmailTaken = async (email: string): Promise<boolean> => {
  const q = query(ref(db, "users"), orderByChild("email"), equalTo(email));
  const snapshot = await get(q);
  return snapshot.exists();
};

/**
 * Create user in Firebase Realtime DB
 */
export const createUserInDB = async (uid: string, data: any) => {
  return set(ref(db, `users/${uid}`), data);
};
