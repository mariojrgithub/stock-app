const express = require("express");

const PickFileCtrl = require("../controllers/pickfilesystem-ctrl");

const router = express.Router();

router.post("/pickfiles", PickFileCtrl.createPickFile);
router.put("/pickfiles/:id", PickFileCtrl.updatePickFile);
router.delete("/pickfiles/:id", PickFileCtrl.deletePickFile);
router.get("/pickfiles/:id", PickFileCtrl.getPickFileById);
router.get("/pickfiles", PickFileCtrl.getPickFiles);

module.exports = router;
