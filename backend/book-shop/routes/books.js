const express = require("express");
const router = express.Router();

router.use(express.json());

// 전체 도서 조회
router.get("/", (req, res) => {});

// 개별 도서 조회
router.get("/:id", (req, res) => {});

// 카테고리별 도서 목록 조회
router.get("/", (req, res) => {
  const categoryId = req.query.categoryId;
  const isNew = req.query.new;
});

module.exports = router;
