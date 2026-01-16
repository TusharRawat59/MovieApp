import express from "express"
import isAdmin from "../middlewares/isAdmin.js"
import {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie
} from "../controllers/adminMovie.controller.js"

const router = express.Router()

router.post("/", isAdmin, addMovie)
router.get("/", isAdmin, getAllMovies)
router.put("/:id", isAdmin, updateMovie)
router.delete("/:id", isAdmin, deleteMovie)

export default router