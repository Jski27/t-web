// Lightweight password verification abstraction.
// In production, do not expose real password hashes client-side; prefer server auth.
// This is a placeholder for demonstration until a backend exists.

// Simple SHA-256 based check (NOT a substitute for real secure auth)
export async function sha256Hex(str) {
  const data = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

// Compare against an environment-provided hash (expected plain SHA-256 here for demo)
const ENV_HASH = import.meta.env.VITE_DASHBOARD_PASSWORD_HASH;

export async function verifyPassword(plain) {
  if (!ENV_HASH) return false;
  if (ENV_HASH.startsWith('$argon2id$')) {
    console.warn('Argon2id hash present but no client-side verifier implemented. Always failing for safety.');
    return false;
  }
  const calc = await sha256Hex(plain);
  return calc === ENV_HASH;
}
