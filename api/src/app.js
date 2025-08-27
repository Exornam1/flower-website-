const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const flowerRoutes = require("./routes/flower.js");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/flowers", flowerRoutes);

app.get("/", (req, res) => {
	res.send("Welcome to the Flower API");
});

module.exports = app;
