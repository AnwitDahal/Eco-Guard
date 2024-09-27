const argon2 = require("argon2");

module.exports.hashPassword = async (rawPassword) => {
  const hashedPassword = await argon2.hash(rawPassword);
  return hashedPassword;
};

module.exports.verifyPassword = async (hashedPassword, rawPassword) => {
  const isValid = await argon2.verify(hashedPassword, rawPassword);
  return isValid;
};
