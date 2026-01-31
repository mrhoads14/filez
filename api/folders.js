import express from "express";
import { getFolderById, getFolders } from "../db/queries/folders.js";
import { createFile } from "../db/queries/files.js";

const foldersRouter = express.Router();


foldersRouter.get("/", async (req, res, next) => {
  try {
    const folders = await getFolders();
    res.send(folders);
  } catch (err) {
    next(err);
  }
});


foldersRouter.get("/:id", async (req, res, next) => {
  const notNumRegex = /\D/;
  const { id } = req.params;
  if (!id || notNumRegex.test(id)) {
    res.status(400).send("id must be a non-negative integer");
    return;
  }
  try {
    const folder = await getFolderById(Number(id));
    if (!folder) {
      res.status(404).send("specified folder does not exist");
    } else {
      res.send(folder);
    }
  } catch (err) {
    next(err)
  }
});


foldersRouter.post("/:id/files", async (req, res, next) => {
  const notNumRegex = /\D/;
  const { id } = req.params;
  if (!id || notNumRegex.test(id) || !req.body || !(req.body.name && req.body.size)) {
    res.status(400).send("id must be non-negative integer and body must have required files");
    return;
  }
  
  const folderId = Number(id);
  try {
    const folder = await getFolderById(folderId);
    if (!folder) {
      res.status(404).send("specified folder does not exist");
      return;
    }
    const newFile = await createFile({ 
      name: req.body.name, 
      size: req.body.size,
      folderId: folderId
    })
    if (!newFile) {
      throw Error('error creating File in folders/:id/files post endpoint');
    } else {
      res.status(201).send(newFile);
    }

  } catch (err) {
    next(err);
  }
})

export default foldersRouter;
