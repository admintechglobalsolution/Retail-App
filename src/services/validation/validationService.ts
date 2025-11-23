// src/services/validation/validationService.ts

export const validateUsername = (username: string): string | null => {
  if (!username.trim()) return "Username is required";
  if (username.length < 8) return "Username must be at least 8 characters";
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) return "Phone number is required";
  if (!/^\d{10}$/.test(phone)) return "Phone number must be 10 digits";
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return "Email is required";
  if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password.trim()) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  return null;
};
