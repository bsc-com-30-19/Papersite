const express = require("express");
const pool = require("../db");
const queries = require("../utils/queries");
const authorization = require("../middleware/authoriztion");
const path = require('path');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, filename, cb) => {
    cb(null, '../Papers');
  },
  filename: (req, file, cb) =>{
    cb(null, Date.now()+ '-' + path.extname(file.originalname));
  }
});

const upload = multer({storage: storage});
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

router.post("/upload", upload.single('file'), authorization, async (req,res) =>{
    try {
        const { originalname, filename, size, path } = req.file;
        const userId = req.user;
        const course = req.body.course;
        pool.query(queries.addFile, [userId, filename, path, size, course]);
        res.status.send("File uploaded succsesfully")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("An error occured during file upload");
    }
})

module.exports = router;
