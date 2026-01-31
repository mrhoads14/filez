import express from "express";
import filesRouter from "./api/files.js";
import foldersRouter from "./api/folders.js";

const app = express();


app.use(express.json());

app.use("/files", filesRouter);

app.use("/folders", foldersRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Server error. It's not you, it's me.");
});


export default app;
