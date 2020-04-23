const express = require("express");

const PickTransactionsCtrl = require("../controllers/picktransactions-ctrl");

const router = express.Router();

router.post("/picktransactions", PickTransactionsCtrl.createPickTransactions);
router.put(
  "/picktransactions/:id",
  PickTransactionsCtrl.updatePickTransactions
);
router.delete(
  "/picktransactions/:id",
  PickTransactionsCtrl.deletePickTransactions
);
router.get(
  "/picktransactions/:id",
  PickTransactionsCtrl.getPickTransactionsById
);
router.get("/picktransactions", PickTransactionsCtrl.getPickTransactions);

module.exports = router;
