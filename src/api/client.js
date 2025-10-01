// Simple fetch wrapper with basic retry & JSON parsing.
const BASE = import.meta.env.VITE_API_BASE || '';

async function request(path, { method = 'GET', body, headers = {}, retry = 1 } = {}) {
  const opts = {
    method,
    headers: {
      'Accept': 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'omit'
  };
  try {
    const res = await fetch(BASE + path, opts);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch (e) {
    if (retry > 0) return request(path, { method, body, headers, retry: retry - 1 });
    throw e;
  }
}

export const api = {
  getAnalytics: () => request('/analytics'), // Expect shape: { pageViews:[], sessions:[], ... }
};
