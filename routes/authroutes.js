const express = require("express");
const pool = require("../db")
const queries = require("../utils/queries");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
//Make express router
const router = express.Router();
const validInfo = require("../middleware/validInfo");
const authoriztion = require("../middleware/authoriztion");
const controller = require("../controller");




//sign in route
router.post("/log-in", validInfo, controller.logIn)

//sign up route
router.post("/sign-up", validInfo, controller.signUp);

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

router.get("/is-verify", authoriztion, async (req, res) =>{
  try{
    res.json(true)
  }
  catch(err){
    console.error(error.message);
    res.status(500).send("server error");
  }
})

module.exports = router;
