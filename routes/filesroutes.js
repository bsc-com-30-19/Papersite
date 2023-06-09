//modules
const express = require("express");
const pool = require("../db")
const queries = require("../utils/queries");
const jwtGenerator = require("../utils/jwtGenerator");
//Make express router
const router = express.Router();
const validInfo = require("../middleware/validInfo");
const authoriztion = require("../middleware/authoriztion");
const controller = require("../controller");
//get files router
router.get("/", controller.getFiles);
//get files by course router
router.get("/", controller.getFilesByCourse);
//Get files by id router
router.get("/:id", controller.getFileById);

module.exports = router;