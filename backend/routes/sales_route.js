import express from "express";
const router = express.Router();

import { all_sales, deleteSale, new_sale } from "../controllers/sales_control.js";

router.post("/", new_sale);
router.get("/", all_sales);
router.delete("/:id", deleteSale);

export default router;
