require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router");
const errorMiddleware = require("./middleware/error-middleware");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.use("/api", router);

app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true, // Устанавливает использование нового парсера URL MongoDB, который является частью нативного драйвера MongoDB для Node.js.
        //! Уcтареет к версии 4.0.0
        useUnifiedTopology: true, // Устанавливает использование новой и единой топологии подключения MongoDB, представленной в драйвере MongoDB для Node.js, для обеспечения надежного и эффективного подключения к серверу MongoDB.
        //! Уcтареет к версии 4.0.0
      })
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error("MongoDB connection error:", err));

    app.listen(PORT, () => {
      console.log(`Server start on Port = ${PORT}`);
      console.log(`http://localhost:${PORT}/`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
