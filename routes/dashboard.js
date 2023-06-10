//modules
const express = require("express");
const pool = require("../db");
const queries = require("../utils/queries");
const authorization = require("../middleware/authoriztion");
const upload = require("../fileUpload")
const controller = require("../controller");
const path = require("path");


const router = express.Router();


router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(queries.getUsersById, [req.user]);
    res.json(user.rows[0]);

  } catch (err) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});
//delete user route
router.delete("/users/:id", authorization, controller.deleteUser);
//file upload route
router.post("/upload", upload.single('file'), authorization, controller.fileUpload);
//file delete route
router.delete("/delete", authorization, controller.deleteFileById);

module.exports = router;
