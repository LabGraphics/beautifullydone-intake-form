export function isRequired(value) {
  return value !== undefined && value !== null && String(value).trim().length > 0;
}

export function isEmail(value) {
  if (!value) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export function isNumber(value) {
  if (!value) return false;
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export function minLength(value, length) {
  if (!value) return false;
  return String(value).length >= length;
}
