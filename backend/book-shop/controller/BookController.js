const conn = require("../mysql");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

const books = (req, res) => {
  let categoryId = req.query.categoryid;
  let isNew = req.query.isnew;
  let { limit, page } = req.query;
  limit = parseInt(limit);
  page = parseInt(page);

  let sql = `SELECT *, (SELECT count(*) FROM likes WHERE books.id = liked_book_id) AS likes FROM books`; // 전체 도서 조회
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
    return res.status(StatusCodes.OK).json(results);
  });
};

// 개별 도서 조회
const bookDetail = (req, res) => {
  let { id } = req.params;
  let { userId } = req.body;
  id = parseInt(id);
  const values = [userId, id, id];

  const sql = `SELECT * ,
  (SELECT count(*) FROM likes WHERE liked_book_id = books.id) AS likes,
  (SELECT EXISTS (SELECT * FROM likes WHERE user_id = ? AND liked_book_id = ?)) AS liked
  FROM books LEFT JOIN categories
  ON books.category_id = categories.category_id WHERE books.id=?;`;

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
