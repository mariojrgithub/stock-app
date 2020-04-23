const express = require("express");

const StockCtrl = require("../controllers/stock-ctrl");

const router = express.Router();

router.post("/stocks", StockCtrl.createStock);
router.put("/stocks/:id", StockCtrl.updateStock);
router.delete("/stocks/:id", StockCtrl.deleteStock);
router.get("/stocks/:id", StockCtrl.getStockById);
router.get("/stocks", StockCtrl.getStocks);

module.exports = router;
