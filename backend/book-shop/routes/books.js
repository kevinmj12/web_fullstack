const express = require("express");
const router = express.Router();
const { books, bookDetail } = require("../controller/BookController");

router.use(express.json());

// 전체 도서 조회, 카테고리별 도서 조회
router.get("/", books);

// 개별 도서 조회
router.get("/:id", bookDetail);

module.exports = router;
