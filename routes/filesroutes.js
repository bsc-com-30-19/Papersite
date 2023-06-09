const express = require("express");
const pool = require("../db")
const queries = require("../utils/queries");
const jwtGenerator = require("../utils/jwtGenerator");
//Make express router
const router = express.Router();
const validInfo = require("../middleware/validInfo");
const authoriztion = require("../middleware/authoriztion");
const controller = require("../controller");

router.get("/", controller.getFiles);

router.get("/", controller.getFilesByCourse);

router.get("/:id", controller.getFileById);

module.exports = router;