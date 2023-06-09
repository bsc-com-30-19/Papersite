const express = require("express");
const { Pool } = require("pg");
const routes = require("./routes/authroutes");
const dashroutes = require("./routes/dashboard");

const app = express();

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);
app.use("/dashboard", dashroutes);
app.listen(3200, () => {
  console.log("Server listening on port 3200");
});
