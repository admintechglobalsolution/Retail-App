// src/services/firebase/userService.ts
import { equalTo, get, orderByChild, query, ref, set } from "firebase/database";
import { db } from "./firebaseInit";

export const isUsernameTaken = async (username: string) => {
  const q = query(
    ref(db, "users"),
    orderByChild("username"),
    equalTo(username)
  );
  const snapshot = await get(q);
  return snapshot.exists();
};

export const isPhoneTaken = async (phone: string) => {
  const q = query(ref(db, "users"), orderByChild("phone"), equalTo(phone));
  const snapshot = await get(q);
  return snapshot.exists();
};

// Create user
export const createUserInDB = async (uid: string, data: any) => {
  return set(ref(db, "users/" + uid), data);
};
