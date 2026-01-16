import axios from "axios"

export const getMovies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const search = req.query.search || ""
    const minRating = Number(req.query.minRating) || 0
    const sortBy = req.query.sortBy || ""   // ✅ NEW

    const url = search
      ? "https://api.themoviedb.org/3/search/movie"
      : "https://api.themoviedb.org/3/movie/popular"

    const response = await axios.get(url, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: search,
        page
      }
    })

    let movies = response.data.results
      .filter(movie => movie.vote_average >= minRating)
      .map(movie => ({
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        rating: movie.vote_average,
        poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null
      }))

    // 🔽 SORT LOGIC (ONLY NAME & RATING)
    if (sortBy === "name") {
      movies.sort((a, b) => a.title.localeCompare(b.title))
    }

    if (sortBy === "rating") {
      movies.sort((a, b) => b.rating - a.rating)
    }

    res.json({
      movies,
      totalPages: response.data.total_pages,
      currentPage: page
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to fetch movies" })
  }
}