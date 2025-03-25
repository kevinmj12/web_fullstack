const conn = require("../mysql");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const ensureAuthorization = require("../auth");

const addLike = (req, res) => {
  const { likedBookId } = req.body;
  const token = ensureAuthorization(req);

  if (token instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었습니다. 로그인이 필요합니다.",
    });
  } else if (token instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "잘못된 토큰입니다.",
    });
  }

  const sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?);`;
  const values = [token.id, likedBookId];

  conn.query(sql, values, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Error: ${err.code}`,
      });
    }
    return res.status(StatusCodes.CREATED).json(decodedToken);
  });
};

const removeLike = (req, res) => {
  const { likedBookId } = req.body;
  const token = ensureAuthorization(req);

  if (token instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었습니다. 로그인이 필요합니다.",
    });
  } else if (token instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "잘못된 토큰입니다.",
    });
  }

  const sql = `DELETE FROM likes where user_id=? AND liked_book_id=?;`;
  const values = [token.id, likedBookId];

  conn.query(sql, values, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Error: ${err.code}`,
      });
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

module.exports = {
  addLike,
  removeLike,
};
