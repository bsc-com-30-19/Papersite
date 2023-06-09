//Modules
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

//verify token route
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
