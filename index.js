const express = require("express");
const path = require("path");
const exphb = require("express-handlebars");

const members = require("./Members");
const logger = require("./middleware/logger");
const { title } = require("process");
// const members = require("./Members");

const app = express();

// init logger
app.use(logger);

// HandleBars Middleware
app.engine("handlebars", exphb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// HandleBars Middleware : Homepage Route 在根目錄跑這個 middleware
app.get("/", (req, res) => {
  res.render("index", {
    title: "Member List",
    members,
  });
});

// body parser middleware
app.use(express.json()); //allow it to handle json
app.use(express.urlencoded({ extended: false }));

// set static folder path (和上面的handlewares 選一個，)
app.use(express.static(path.join(__dirname, "public")));

// set member api route
app.use("/api/members", require("./routes/api/members"));

// use router
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
});
