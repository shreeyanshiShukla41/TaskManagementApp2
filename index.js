const dotenv = require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const middleware = require("./middleware");
const ejsMate = require("ejs-mate");
const port = 8000 || process.env.PORT;
const { env } = require("process");

const dbUrl = process.env.ATLAS_URL;

main()
  .then((r) => console.log(r))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = false;
//   next();
// });

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
