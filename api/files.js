import express from "express";
import { readFiles } from "../db/queries/files.js";
const filesRouter = express.Router();


filesRouter.get("/", async (req, res, next) => {
  try {
    const files = await readFiles();
    res.send(files);
  } catch (err) {
    next(err);
  }
});

export default filesRouter;
