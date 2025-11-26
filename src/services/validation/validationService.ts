// src/services/validation/validationService.ts

// Helper: sanitize input to prevent XSS if needed before rendering
export const sanitizeInput = (input: string) => input.replace(/[<>&"'`]/g, "");

// Normalize username and email
export const normalizeUsername = (username: string) =>
  username.trim().toLowerCase();
export const normalizeEmail = (email: string) => email.trim().toLowerCase();

// Validate username
export const validateUsername = (username: string): string | null => {
  const trimmed = normalizeUsername(username);

  if (!trimmed) return "Username is required";
  if (trimmed.length < 3) return "Username must be at least 3 characters";
  if (trimmed.length > 15) return "Username must be at most 15 characters";

  // Only allow letters, numbers, ., -, _
  if (!/^[a-z0-9._-]+$/.test(trimmed))
    return "Username contains invalid characters";

  return null;
};

// Validate phone
export const validatePhone = (phone: string): string | null => {
  const trimmed = phone.trim();

  if (!trimmed) return "Phone number is required";

  // Allow only digits — if letters exist, it's invalid
  if (!/^\d+$/.test(trimmed)) {
    return "Phone number must contain only numbers";
  }

  // Must be exactly 10 digits
  if (trimmed.length !== 10) {
    return "Phone number must be 10 digits";
  }

  return null;
};

// Validate email
export const validateEmail = (email: string): string | null => {
  const normalized = normalizeEmail(email);

  if (!normalized) return "Email is required";
  if (!/\S+@\S+\.\S+/.test(normalized)) return "Invalid email format";

  return null;
};

// Validate password
export const validatePassword = (password: string): string | null => {
  const trimmed = password.trim();

  if (!trimmed) return "Password is required";
  if (trimmed.length < 8) return "Password must be at least 8 characters";
  // Optional: Add complexity check (uppercase, number, special char)
  // if (!/(?=.*[A-Z])/.test(trimmed)) return "Password must contain an uppercase letter";
  // if (!/(?=.*\d)/.test(trimmed)) return "Password must contain a number";
  // if (!/(?=.*[!@#$%^&*])/.test(trimmed)) return "Password must contain a special character";
  return null;
};
