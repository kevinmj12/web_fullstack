const crypto = require("crypto");

const password = "1234";

for (let i = 0; i < 10; i++) {
  const salt = crypto.randomBytes(64).toString("base64");
  const hashPassword = crypto
    .pbkdf2Sync("1234", "abc", 10000, 64, "sha512")
    .toString("base64");

  console.log(i, " password: ", hashPassword);
}
