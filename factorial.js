module.exports = function factorial(n) {
  if (n < 0) throw new Error("Negative number");
  return n === 0 ? 1 : n * factorial(n - 1);
};
