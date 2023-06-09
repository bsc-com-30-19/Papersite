const express = require("express");
const { Pool } = require("pg");
const queries = require("./queries");
//Make express router
const router = express.Router();

//Database connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Papersite",
  password: "chickenfat",
  port: 5432,
});
//sign in route

//sign up route
router.post("/sign-up", (req, res) => {
  const { username, email, password } = req.body;

  pool.query(queries.getStudentsByEmail, [email], (error, results) => {
    if (results.rows.length) {
      res.send("User already exists");
    } else {
      pool.query(
        queries.addStudent,
        [username, email, password],
        (err, results) => {
          if (err) {
            console.error("Error executing query", err);
            res.status(500).send("Internal server error");
          } else {
            res.status(201).send("User signed up succesfully");
          }
        }
      );
    }
  });
});

//delete user route
router.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUsersById, [id], (err, results) => {
    if (!results.rows.length) {
      res.send("User does not exist");
    } else {
      pool.query(queries.deleteUserById, [id], (err, results) => {
        if (err) throw err;
        res.send("User deleted");
      });
    }
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
