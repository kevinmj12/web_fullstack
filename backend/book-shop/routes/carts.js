const express = require("express");
const router = express.Router();
const {
  addCartItems,
  getCartItems,
  removeCartItems,
} = require("../controller/CartController");

router.use(express.json());

// 장바구니 추가
router.post("/", addCartItems);

// 장바구니 조회
router.get("/", getCartItems);

// 장바구니 도서 삭제
router.delete("/", removeCartItems);

module.exports = router;
