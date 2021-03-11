const express = require("express");
const path = require("path");

const members = require("./Members.js");
const logger = require("./middleware/logger");

const app = express();

// init logger
app.use(logger);

//get all members
app.get("/api/members", (req, res) => {
  res.json(members);
});

// set static folder path
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
});
