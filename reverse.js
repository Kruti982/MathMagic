module.exports = function reverse(input) {
  // If input is a string, reverse the characters
  if (typeof input === "string") {
    return input.split("").reverse().join("");
  }

  // If input is an array (numbers or strings), reverse the array
  if (Array.isArray(input)) {
    return input.reverse().join(" ");
  }

  throw new Error("Invalid input for reverse");
};
