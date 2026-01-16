import { useEffect, useState, useContext } from "react"
import axios from "axios"
import MovieCard from "../components/MovieCard"
import { useNavigate } from "react-router-dom"
import { userDataContext } from "../context/UserContext"

const Home = () => {
  const [tmdbMovies, setTmdbMovies] = useState([])
  const [adminMovies, setAdminMovies] = useState([])
  const [movies, setMovies] = useState([])

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState("")
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("")
  const [loading, setLoading] = useState(false)

  const { setuserData } = useContext(userDataContext)
  const navigate = useNavigate()

  // 🚪 USER LOGOUT
  const handleLogout = async () => {
    try {
      await axios.get(
        "https://movieapp-backend-4at2.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      )

      setuserData(null)   
      navigate("/")       
    } catch (error) {
      console.log(error)
    }
  }

  // 🎬 Fetch TMDB movies
  const fetchTmdbMovies = async () => {
    const res = await axios.get("https://movieapp-backend-4at2.onrender.com/api/movies", {
      params: {
        page,
        search,
        minRating
      }
    })

    setTmdbMovies(res.data.movies)
    setTotalPages(res.data.totalPages)
  }

  // 🧑‍💼 Fetch Admin movies (PUBLIC)
  const fetchAdminMovies = async () => {
    const res = await axios.get(
      "https://movieapp-backend-4at2.onrender.com/api/movies/admin-public"
    )
    setAdminMovies(res.data)
  }

  // 🔄 Fetch both sources
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true)
        await Promise.all([fetchTmdbMovies(), fetchAdminMovies()])
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [page, search, minRating])

  // 🔀 MERGE + GLOBAL SORT
  useEffect(() => {
    let merged = [...adminMovies, ...tmdbMovies]

    if (sortBy === "name") {
      merged.sort((a, b) =>
        (a.title || "").localeCompare(b.title || "")
      )
    }

    if (sortBy === "rating") {
      merged.sort((a, b) =>
        (b.rating || 0) - (a.rating || 0)
      )
    }

    setMovies(merged)
  }, [adminMovies, tmdbMovies, sortBy])

  return (
    <div className="min-h-screen bg-[#0f171e] p-6">

      {/* HEADER + LOGOUT */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#eb2626]">
          Movies
        </h1>

        <button
          onClick={handleLogout}
          className="bg-gray-700 px-5 py-2 rounded text-white hover:bg-gray-600"
        >
          Logout
        </button>
      </div>

      {/* 🔍 Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="px-4 py-2 rounded bg-[#1c2631] text-white outline-none"
        />

        <select
          value={minRating}
          onChange={(e) => {
            setMinRating(e.target.value)
            setPage(1)
          }}
          className="px-4 py-2 rounded bg-[#1c2631] text-white"
        >
          <option value="0">All Ratings</option>
          <option value="5">5+</option>
          <option value="6">6+</option>
          <option value="7">7+</option>
          <option value="8">8+</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded bg-[#1c2631] text-white"
        >
          <option value="">Sort By</option>
          <option value="name">Name (A–Z)</option>
          <option value="rating">Rating (High → Low)</option>
        </select>
      </div>

      {/* 🎬 Movies Grid */}
      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : movies.length === 0 ? (
        <p className="text-white text-center">No movies found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movies.map((movie, index) => (
            <MovieCard
              key={movie._id || movie.id || index}
              {...movie}
            />
          ))}
        </div>
      )}

      {/* 📄 Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
          className="px-4 py-2 bg-[#1c2631] text-white rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-white">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(prev => prev + 1)}
          className="px-4 py-2 bg-[#1c2631] text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  )
}

export default Home
