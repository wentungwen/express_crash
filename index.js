const express = require("express");
const path = require("path");
const app = express();

const members = [
  { id: "1111", name: "personA", email: "1111@gmail.com", status: "active" },
  { id: "2222", name: "personB", email: "2222@gmail.com", status: "inactive" },
  { id: "3333", name: "personC", email: "3333@gmail.com", status: "active" },
  { id: "4444", name: "personD", email: "4444@gmail.com", status: "inactive" },
];

// set static folder path
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
});
