const express = require("express");
const router = express.Router();
const {
  order,
  getOrders,
  getOrderDetails,
} = require("../controller/OrderController");

router.use(express.json());

// 주문하기
router.post("/", order);

// 주문 목록 조회
router.get("/", getOrders);

// 주문 상세 상품 조회
router.get("/:id", getOrderDetails);

module.exports = router;
