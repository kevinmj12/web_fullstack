const conn = require("../mysql");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const ensureAuthorization = require("../auth");

const books = (req, res) => {
  let booksRes = {};
  let categoryId = req.query.categoryid;
  let isNew = req.query.isnew;
  let { limit, page } = req.query;
  limit = parseInt(limit);
  page = parseInt(page);

  let sql = `SELECT SQL_CALC_FOUND_ROWS *, (SELECT count(*) FROM likes WHERE books.id = liked_book_id) AS likes FROM books`; // 전체 도서 조회
  let values = [];
  if (categoryId && isNew) {
    // 카테고리별 신간 도서 조회
    sql += `WHERE category_id = ? AND
      pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
    values = [categoryId, isNew];
  } else if (categoryId) {
    // 카테고리별 조회
    sql += "WHERE category_id = ?";
    values = [categoryId];
  } else if (isNew) {
    // 신간 조회
    sql += `WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
    values = [isNew];
  }

  sql += ` LIMIT ${limit} OFFSET ${(page - 1) * limit};`;

  conn.query(sql, values, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Error: ${err.code}`,
      });
    }
    if (results.length) {
      booksRes.books = results;
    } else {
      return res.status(StatusCodes.NOT_FOUND).end();
    }
  });

  sql += `SELECT found_rows()`;

  conn.query(sql, values, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Error: ${err.code}`,
      });
    }

    let pagination = {};
    pagination.page = page;
    pagination.totalCount = results[0].found_rows();

    booksRes.pagination = pagination;

    return res.status(StatusCodes.OK).json(booksRes);
  });
};

// 개별 도서 조회
const bookDetail = (req, res) => {
  const token = ensureAuthorization(req);
  let sql;

  if (token instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었습니다. 로그인이 필요합니다.",
    });
  } else if (token instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "잘못된 토큰입니다.",
    });
  } else if (token instanceof ReferenceError) {
    sql = `SELECT * ,
    (SELECT count(*) FROM likes WHERE liked_book_id = books.id) AS likes,
    FROM books LEFT JOIN categories
    ON books.category_id = categories.category_id WHERE books.id=?;`;
  } else {
    sql = `SELECT * ,
  (SELECT count(*) FROM likes WHERE liked_book_id = books.id) AS likes,
  (SELECT EXISTS (SELECT * FROM likes WHERE user_id = ? AND liked_book_id = ?)) AS liked
  FROM books LEFT JOIN categories
  ON books.category_id = categories.category_id WHERE books.id=?;`;
  }

  let { id } = req.params;
  id = parseInt(id);

  const values = [token.id, id, id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Error: ${err.code}`,
      });
    }
    if (results[0]) {
      return res.status(StatusCodes.OK).json(results[0]);
    } else {
      return res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};

module.exports = {
  books,
  bookDetail,
};
