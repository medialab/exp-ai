export const sortModelsByDistance = (a, b, keys, scales) => {
  const vector1 = keys.map((k) => scales[k](+a[k]));
  const vector2 = keys.map((k) => scales[k](+b[k]));
  const distance = keys.reduce(
    (sum, _k, index) => sum + (vector2[index] - vector1[index]),
    0
  );
  if (distance > 0) {
    return 1;
  } else if (distance < 0) {
    return -1;
  }
  return 0;
};
