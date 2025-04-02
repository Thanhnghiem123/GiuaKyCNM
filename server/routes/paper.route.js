const express = require("express");
const router = express.Router();
const paperController = require("../controllers");
const upload = require("../middleware/upload");


router.get("/", paperController.get);
router.post("/create", upload, paperController.post)
router.post("/delete/:id",paperController.delete)

module.exports = router;