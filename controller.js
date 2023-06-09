const pool = require("./db");
const queries = require("./utils/queries");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./utils/jwtGenerator");

const validInfo = require("./middleware/validInfo");
const authoriztion = require("./middleware/authoriztion");

//Log in controller
const logIn = async (req, res) => {
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
  res.json({ token });
};

//sign up controller
const signUp = async (req, res) => {
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
  }

module.exports = {
  logIn,
  signUp
};
