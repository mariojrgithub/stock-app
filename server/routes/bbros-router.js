const express = require("express");

const BBrosCtrl = require("../controllers/bbros-ctrl");

const router = express.Router();

router.post("/bbros", BBrosCtrl.createBBros);
router.put("/bbros/:id", BBrosCtrl.updateBBros);
router.delete("/bbros/:id", BBrosCtrl.deleteBBros);
router.get("/bbros/:id", BBrosCtrl.getBBrosById);
router.get("/bbros", BBrosCtrl.getBBros);

module.exports = router;
