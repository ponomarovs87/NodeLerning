import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose
  .connect(
    `mongodb+srv://TestAdmin:wwwww@mytestbd.basqzin.mongodb.net/?retryWrites=true&w=majority&appName=MyTestBD`
  )
  .then(() => console.log("MongoDB OK"))
  .catch((err) => console.log("MongoDB Error", err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/register", (req, res) => {

});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("server OK");
});
