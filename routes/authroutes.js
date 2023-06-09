const express = require("express");
const { Pool } = require("pg");
const queries = require("../queries");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
//Make express router
const router = express.Router();
const validInfo = require("../middleware/validInfo")

//Database connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Papersite",
  password: "chickenfat",
  port: 5432,
});

//sign in route
router.post("/log-in", validInfo, async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(queries.getStudentsByEmail, [email]);

  if (user.rows.length === 0) {
    return res.status(401).send("Password or email is incorrect");
  }

  const validPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!validPassword) {
    return res.status(401).send("Password or email is incorrect");
  }

  const token = jwtGenerator(user.rows[0].use_id);
  res.json({token});
});

//sign up route
router.post("/sign-up", validInfo, async (req, res) => {
  const { username, email, password } = req.body;

  const user = await pool.query(queries.getStudentsByEmail, [email]);

  if (user.rows.length !== 0) {
    return res.status(401).send("User Already Exists");
  }

  //Bcrypting password
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword = await bcrypt.hash(password, salt);

  const newUser = await pool.query(queries.addStudent, [
    username,
    email,
    bcryptPassword,
  ]);

  const token = jwtGenerator(newUser.rows[0].use_id);
  res.json({ token });
});

//delete user route
router.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUsersById, [id], (err, results) => {
    if (!results.rows.length) {
      return res.send("User does not exist");
    }
    pool.query(queries.deleteUserById, [id], (err, results) => {
      if (err) throw err;
      res.send("User deleted");
    });
  });
});

//GET USERS
router.get("/users", (req, res) => {
  pool.query(queries.getUsers, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
});

//get user by id
router.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUsersById, [id], (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
});

module.exports = router;
