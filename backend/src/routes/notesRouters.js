import express from "express";
import { getNotes, getNoteById, createNotes, updateNotes, deleteNotes } from "../controller/notesControllers.js";

const router = express.Router();

export default router;

router.get("/", getNotes);

router.get("/:id", getNoteById);

router.post("/", createNotes);

router.put("/:id", updateNotes);

router.delete("/:id", deleteNotes);