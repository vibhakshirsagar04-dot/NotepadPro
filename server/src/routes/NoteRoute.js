import express from "express";
import {
  createNote,
  deleteNote,
  updateNote,
  getNotes
} from "../Controllers/notecontroller.js";

import protect from "../middleware/authmiddleware.js";

const noteRouter = express.Router();

// 🔐 All routes protected
noteRouter.post("/create", protect, createNote);
noteRouter.get("/fetch",  getNotes);
noteRouter.put("/edit/:id", protect, updateNote);
noteRouter.delete("/delete/:id", protect, deleteNote);

export default noteRouter;
