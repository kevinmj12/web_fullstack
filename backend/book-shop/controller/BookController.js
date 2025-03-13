const conn = require("../mysql");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

const books = (req, res) => {
  let { category_id } = req.query;

  if (!category_id) {
    // 전체 도서 조회
    const sql = "SELECT * FROM books;";

    conn.query(sql, (err, results) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          msg: `Error: ${err.code}`,
        });
      }
      return res.status(StatusCodes.OK).json(results);
    });
  } else {
    // 카테고리별 도서 목록 조회
    category_id = parseInt(category_id);

    const sql = "SELECT * FROM books WHERE category_id=?;";

    conn.query(sql, category_id, (err, results) => {
      if (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          msg: `Error: ${err.code}`,
        });
      }
      if (results[0]) {
        return res.status(StatusCodes.OK).json(results);
      } else {
        return res.status(StatusCodes.NOT_FOUND).end();
      }
    });
  }
};

// 개별 도서 조회
const bookDetail = (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const sql = "SELECT * FROM books WHERE id=?;";

  conn.query(sql, id, (err, results) => {
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
