const conn = require("../mysql");
const { StatusCodes } = require("http-status-codes");
const ensureAuthorization = require("../auth");
const jwt = require("jsonwebtoken");

// 장바구니 추가
const addCartItems = (req, res) => {
  const { book_id, counts } = req.body;
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

  const sql = `INSERT INTO cart_items (book_id, counts, user_id) VALUES (?, ?, ?);`;
  const values = [book_id, counts, token.id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Error: ${err.code}`,
      });
    }
    return res.status(StatusCodes.CREATED).json(results);
  });
};

// 장바구니 아이템 목록 조회
const getCartItems = (req, res) => {
  const { selected } = req.body;

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

  let sql = `SELECT cart_items.id, book_id, title, summary, counts, price 
                FROM cart_items LEFT JOIN books 
                ON cart_items.book_id = books.id
                WHERE user_id = ?`;
  const values = [token.id];

  if (selected) {
    sql += ` AND cart_items.id IN (?)`;
    values.push(selected);
  }

  conn.query(sql, values, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Error: ${err.code}`,
      });
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

// 장바구니 제거
const removeCartItems = (req, res) => {
  const { cartId } = req.body;

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

  const sql = `DELETE FROM cart_items WHERE id = ?;`;
  const values = [cartId];

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
  addCartItems,
  getCartItems,
  removeCartItems,
};
