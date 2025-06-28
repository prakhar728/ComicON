export function getSecureRandomNumber(min = 0, max = 1) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array); // cryptographically secure
  const range = max - min;
  return min + (array[0] / (0xFFFFFFFF + 1)) * range;
}
