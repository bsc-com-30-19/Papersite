const pool = require("./db");
const queries = require("./utils/queries");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./utils/jwtGenerator");
const fs = require("fs");
const path = require("path");

const validInfo = require("./middleware/validInfo");
const authoriztion = require("./middleware/authoriztion");
const upload = require("./middleware/fileUpload");

//User controllers

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(queries.getStudentsByEmail, [email]);

    if (user.rows.length === 0) {
      return res.status(401).send("Password or email is incorrect");
    }
    //Check if password is valid
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).send("Password or email is incorrect");
    }
    //Generating token
    const token = jwtGenerator(user.rows[0].use_id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
};

const signUp = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occured while signing up");
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    user = await pool.query(queries.getUsersById, [id]);
    if (user.rows.length === 0) {
      return res.status(404).send("User does not exist");
    }
    await pool.query(queries.deleteUserById, [id], (err, results) => {
      if (err) throw err;
      res.send("User deleted");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occured whilst signing up");
  }
};

//File controllers
const getFiles = async (req, res) => {
  try {
    files = pool.query(queries.getFiles);
    res.status(200).json(files.rows);
    console.log(
      path.resolve("C:/Users/paulk/onedrive/documents/projects/Papers/")
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
};

const getFileById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const fileq = await pool.query(queries.getFileById, [id]);
    if (fileq.rows.length === 0) {
      return res.status(404).send("File does not exist");
    }
    res.status(200).json(fileq.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
};

const getFilesByCourse = async (req, res) => {
  try {
    const course = req.params.course;
    await pool.query(queries.getFileById, [course], (err, results) => {
      if (err) throw err;
      res.status(200).json(results.rows);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
};

const fileUpload = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    console.log(req.file);
    const { originalname, filename, size, path } = req.file;
    const userId = req.user;
    const course = req.body.course;
    await pool.query(queries.addFile, [userId, filename, path, size, course]);
    res.status(200).send("File uploaded succsesfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occured during file upload");
  }
};

const deleteFileById = async (req, res) => {
  const id = parseInt(req.params.id);

  const fileq = await pool.query(queries.getFileById, [id]);

  if ((await fileq).rows.length === 0) {
    return res.status(404).send("File doe not exist");
  }

  const file = fileq.rows[0];
  const filePath = path.join(__dirname, "..", "papers", file.file_path);

  fs.unlinkSync(filepath);

  await pool.query(queries.deleteFileById, [id]);

  res.send("File deleted succesfully");
};

module.exports = {
  logIn,
  signUp,
  getFileById,
  getFiles,
  getFilesByCourse,
  deleteFileById,
  fileUpload,
  deleteUser,
};
