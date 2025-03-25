const jwt = require("jsonwebtoken");
require("dotenv").config();

const ensureAuthorization = (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
      return decodedToken;
    } else {
      throw new ReferenceError("jwt must be provided");
    }
  } catch (err) {
    return err;
  }
};

module.exports = ensureAuthorization;
