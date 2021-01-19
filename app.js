const express = require("express");
require("dotenv").config();

const userRoutes = require("./routes/UserRoute");

const app = express();

app.use(express.json());

app.use("/", userRoutes);

app.listen(process.env.PORT);
