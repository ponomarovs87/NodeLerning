import express from "express";
import mongoose from "mongoose";
import { userRoutes, uploadRoutes, postRoutes } from "./routes/routesHub.js";

mongoose
  .connect(
    `mongodb+srv://TestAdmin:wwwww@mytestbd.basqzin.mongodb.net/blog?retryWrites=true&w=majority&appName=MyTestBD`
  )
  .then(() => console.log("MongoDB OK"))
  .catch((err) => console.log("MongoDB Error", err));

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/auth", userRoutes);
app.use("/posts", postRoutes);
app.use("/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server OK");
});
