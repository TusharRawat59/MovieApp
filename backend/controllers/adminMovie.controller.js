import Movie from "../models/movie.model.js"

// ➕ ADD MOVIE
export const addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body)
    res.status(201).json({
      message: "Movie added successfully",
      movie
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to add movie" })
  }
}

// 📄 GET ALL MOVIES (ADMIN)
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 })
    res.status(200).json(movies)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movies" })
  }
}

// ✏️ UPDATE MOVIE
export const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" })
    }

    res.status(200).json({
      message: "Movie updated successfully",
      movie: updatedMovie
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to update movie" })
  }
}

// ❌ DELETE MOVIE
export const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id)

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" })
    }

    res.status(200).json({ message: "Movie deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete movie" })
  }
}