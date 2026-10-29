const ACCOUNTS_KEY = "starbucks.accounts";
const SESSION_KEY = "starbucks.session";
const AUTH_CHANGE_EVENT = "starbucks:auth-change";

const notifyAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

export const getCurrentUser = () => {
  const savedSession = sessionStorage.getItem(SESSION_KEY);
  if (!savedSession) {
    return null;
  }

  try {
    const user = JSON.parse(savedSession);
    if (user && typeof user === "object" && typeof user.name === "string" && user.name.trim()) {
      return { name: user.name };
    }
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error;
    }
  }

  sessionStorage.removeItem(SESSION_KEY);
  return null;
};

export const logoutUser = () => {
  sessionStorage.removeItem(SESSION_KEY);
  notifyAuthChange();
};

const readAccounts = () => {
  const savedAccounts = localStorage.getItem(ACCOUNTS_KEY);

  if (!savedAccounts) {
    return [];
  }

  let accounts;
  try {
    accounts = JSON.parse(savedAccounts);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Saved account data is invalid. Please clear the app's saved account data and try again.");
    }
    throw error;
  }
  if (!Array.isArray(accounts)) {
    throw new Error("Saved account data is invalid. Please clear the app's saved account data and try again.");
  }

  return accounts;
};

const hashPassword = async (password, salt) => {
  if (!window.crypto || !window.crypto.subtle) {
    throw new Error("Secure password storage is unavailable in this browser. Please use a secure connection or a supported browser.");
  }

  const passwordKey = await window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const saltBytes = new Uint8Array(salt.match(/.{2}/g).map((byte) => Number.parseInt(byte, 16)));
  const digest = await window.crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: saltBytes, iterations: 210000, hash: "SHA-256" },
    passwordKey,
    256
  );
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
};

export const registerUser = async ({ name, email, mobile, password }) => {
  if (!window.crypto || !window.crypto.getRandomValues) {
    throw new Error("Secure password storage is unavailable in this browser. Please use a supported browser.");
  }

  const accounts = readAccounts();
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedMobile = mobile.trim();

  if (accounts.some((account) => account.email === normalizedEmail)) {
    throw new Error("An account with this email address already exists.");
  }
  if (accounts.some((account) => account.mobile === normalizedMobile)) {
    throw new Error("An account with this mobile number already exists.");
  }

  const saltBytes = window.crypto.getRandomValues(new Uint8Array(16));
  const salt = Array.from(saltBytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  const passwordHash = await hashPassword(password, salt);

  accounts.push({
    name: name.trim(),
    email: normalizedEmail,
    mobile: normalizedMobile,
    salt,
    passwordHash,
  });
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
};

export const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const account = readAccounts().find((savedAccount) => savedAccount.email === normalizedEmail);

  if (!account) {
    throw new Error("We couldn't find an account with that email and password.");
  }

  const passwordHash = await hashPassword(password, account.salt);
  if (passwordHash !== account.passwordHash) {
    throw new Error("We couldn't find an account with that email and password.");
  }

  sessionStorage.setItem(SESSION_KEY, JSON.stringify({
    name: account.name,
    email: account.email,
  }));
  notifyAuthChange();
};
