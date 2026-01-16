import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {
  const [movies, setMovies] = useState([])
  const navigate = useNavigate()

  // 🔄 Fetch Admin Movies
  const fetchMovies = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/admin/movies",
        { withCredentials: true }
      )
      setMovies(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  // ❌ Delete Movie
  const deleteMovie = async (id) => {
    const confirmDelete = window.confirm("Delete this movie?")
    if (!confirmDelete) return

    try {
      await axios.delete(
        `http://localhost:8000/api/admin/movies/${id}`,
        { withCredentials: true }
      )
      fetchMovies()
    } catch (error) {
      console.log(error)
    }
  }

  // 🚪 Admin Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/admin/logout",
        {},
        { withCredentials: true }
      )

      navigate("/") // redirect to landing page
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div className="min-h-screen bg-[#0f171e] text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#eb2626]">
          Admin Dashboard
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/admin/add-movie")}
            className="bg-[#eb2626] text-black px-6 py-2 rounded font-semibold"
          >
            + Add Movie
          </button>

          <button
            onClick={handleLogout}
            className="bg-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MOVIES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map(movie => (
          <div
            key={movie._id}
            className="bg-[#1c2631] rounded-lg overflow-hidden"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="h-[220px] w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg">
                {movie.title}
              </h3>

              <p className="text-sm text-gray-400">
                ⭐ {movie.rating}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() =>
                    navigate(`/admin/edit-movie/${movie._id}`)
                  }
                  className="bg-blue-600 px-4 py-1 rounded text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteMovie(movie._id)}
                  className="bg-red-600 px-4 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default AdminDashboard