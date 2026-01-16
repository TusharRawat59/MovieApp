import express from "express"
import { getMovies } from "../controllers/movie.controller.js"
import Movie from "../models/movie.model.js"

const router = express.Router()

// 🎬 TMDB Movies (search, filter, sort, pagination)
router.get("/", getMovies)

// 🔓 PUBLIC ADMIN MOVIES (for Home page)
router.get("/admin-public", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 })
    res.status(200).json(movies)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admin movies" })
  }
})

export default router
