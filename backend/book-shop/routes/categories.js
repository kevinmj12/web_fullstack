const express = require("express");
const router = express.Router();
const { categories } = require("../controller/CategoryController");

router.use(express.json());

// 전체 카테고리 조회
router.get("/", categories);

module.exports = router;
