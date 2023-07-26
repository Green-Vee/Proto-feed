import express from "express";
const router = express.Router();

import {
  createProduct,
  getAllProducts,
  toggleIsSold,
} from "../controllers/products.js";

// POST /api/products
router.post("/", createProduct);
router.get("/", getAllProducts);
router.put("/:productId/toggleIsSold", toggleIsSold);

export default router;
