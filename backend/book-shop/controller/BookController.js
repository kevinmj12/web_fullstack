const conn = require("../mysql");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const ensureAuthorization = require("../auth");

const books = (req, res) => {
  let booksRes = {};
  let { categoryId, news, limit, currentPage } = req.query;

  limit = parseInt(limit);
  currentPage = parseInt(currentPage);

  let sql = `SELECT SQL_CALC_FOUND_ROWS *, (SELECT count(*) FROM likes WHERE books.id = liked_book_id) AS likes FROM books `;
  let values = [];

  if (categoryId && news) {
    categoryId = parseInt(categoryId);
    sql += `WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW() `;
    values = [categoryId];
  } else if (categoryId) {
    categoryId = parseInt(categoryId);
    sql += `WHERE category_id = ? `;
    values = [categoryId];
  } else if (news) {
    sql += `WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW() `;
    values = []; // news 바인딩 제거
  }

  sql += `LIMIT ${limit} OFFSET ${(currentPage - 1) * limit};`;

  conn.query(sql, values, (err, results) => {
    if (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: `Query Error: ${err.code}` });
    }

    if (results && results.length) {
      booksRes.books = results;

      // 총 개수 조회
      conn.query(`SELECT FOUND_ROWS() AS totalCount`, (err2, results2) => {
        if (err2) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: `Count Error: ${err2.code}` });
        }

        booksRes.pagination = {
          currentPage,
          totalCount: results2[0].totalCount,
        };

        return res.status(StatusCodes.OK).json(booksRes);
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};

// 개별 도서 조회
const bookDetail = (req, res) => {
  const token = ensureAuthorization(req);
  let sql;

  // if (token instanceof jwt.TokenExpiredError) {
  //   return res.status(StatusCodes.UNAUTHORIZED).json({
  //     message: "로그인 세션이 만료되었습니다. 로그인이 필요합니다.",
  //   });
  // } else if (token instanceof jwt.JsonWebTokenError) {
  //   return res.status(StatusCodes.UNAUTHORIZED).json({
  //     message: "잘못된 토큰입니다.",
  //   });
  // } else
  if (token instanceof ReferenceError) {
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
