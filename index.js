if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const dashboardRoutes=require("./routes/dashboard")
const middleware = require("./middleware");
const ejsMate = require("ejs-mate");
const port = 8000 || process.env.PORT;
const { env } = require("process");

const dbUrl = "mongodb+srv://codingnew50:AgiSGSKGjFbothuy@cluster0.ovma5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

main()
  .then((r) => console.log(r))
  .catch((e) => console.log(e));

async function main() {
  await mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
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
app.use("/api/dashboard",dashboardRoutes)
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
