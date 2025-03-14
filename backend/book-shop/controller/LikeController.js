const conn = require("../mysql");
const { StatusCodes } = require("http-status-codes");

const addLike = (req, res) => {
  const { userId, likedBookId } = req.body;

  const sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?);`;
  const values = [userId, likedBookId];

  conn.query(sql, values, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: `Error: ${err.code}`,
      });
    }
    return res.status(StatusCodes.CREATED).json(results);
  });
};

const removeLike = (req, res) => {
  const { userId, likedBookId } = req.body;

  const sql = `DELETE FROM likes where user_id=? AND liked_book_id=?;`;
  const values = [userId, likedBookId];

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
