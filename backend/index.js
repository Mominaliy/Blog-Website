const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authroutes = require("./routes/authroute");
const postroutes = require("./routes/postroute");

const MONGO_URI =
  "mongodb+srv://mominali1720:rRLgGHtLk6HZK9SF@cluster0.fbse2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "https://blogvault-peach.vercel.app",
      "http://localhost:3000",
      "http://192.168.18.31:3000",
      "https://blog-website-lac-zeta.vercel.app",
    ],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
  })
);

app.options("*", cors());

app.use("/api/auth", authroutes);
app.use("/api/posts", postroutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = 8080;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `Connected to Database and Listening on port http://0.0.0.0:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
