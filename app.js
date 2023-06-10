//moduless
const express = require("express");
const { Pool } = require("pg");
//Routes
const routes = require("./routes/authroutes");
const dashroutes = require("./routes/dashboard");
const fileroutes = require("./routes/filesroutes");
//making express app
const app = express();

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", routes);
app.use("/api/dashboard", dashroutes);
app.use("/api/papers", fileroutes);

app.listen(3200, () => {
  console.log("Server listening on port 3200");
});
