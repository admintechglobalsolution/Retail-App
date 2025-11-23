// src/services/firebase/authService.ts

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "./firebaseInit";

const auth = getAuth(app);

export const signupUserInFirebase = async (email: string, password: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
};
