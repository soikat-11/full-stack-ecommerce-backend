const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

// APP SETUP
const app = express();

// DATABASE SETUP
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERROR", err));

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cors());

// ROUTES AUTO-LOADING
fs.readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

// PORT
const port = process.env.PORT || 8000;

// LISTEN
app.listen(port, () => console.log(`Server is running on port ${port}`));
