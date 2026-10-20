// Namespaced, defensive localStorage helpers. Never store secrets or payment data here.
const NS = 'desireinnovation:v1:'

export function readStore(key, fallback, validate) {
  try {
    const raw = window.localStorage.getItem(NS + key)
    if (raw === null) return fallback
    const value = JSON.parse(raw)
    if (validate && !validate(value)) return fallback
    return value
  } catch {
    return fallback
  }
}

export function writeStore(key, value) {
  try {
    window.localStorage.setItem(NS + key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function clearStore() {
  try {
    Object.keys(window.localStorage)
      .filter((k) => k.startsWith(NS))
      .forEach((k) => window.localStorage.removeItem(k))
  } catch {
    /* storage unavailable */
  }
}
