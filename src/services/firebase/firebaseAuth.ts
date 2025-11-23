// src/services/firebase/firebaseAuth.ts
import { getAuth } from "firebase/auth";
import { app } from "./firebaseInit";

export const auth = getAuth(app);
