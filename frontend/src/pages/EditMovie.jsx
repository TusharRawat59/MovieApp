import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const EditMovie = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState({})

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(
        "https://movieapp-pj8n.onrender.com/api/admin/movies",
        { withCredentials: true }
      )
      const found = res.data.find(m => m._id === id)
      setMovie(found)
    }
    fetchMovie()
  }, [id])

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.put(
      `https://movieapp-pj8n.onrender.com/api/admin/movies/${id}`,
      movie,
      { withCredentials: true }
    )
    navigate("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-[#0f171e] text-white flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-[#1c2631] p-8 rounded-lg w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-bold text-center text-[#eb2626]">
          Edit Movie
        </h2>

        <input name="title" value={movie.title || ""} onChange={handleChange} className="w-full p-2 bg-[#0f171e] rounded" />
        <textarea name="description" value={movie.description || ""} onChange={handleChange} className="w-full p-2 bg-[#0f171e] rounded" />
        <input name="rating" value={movie.rating || ""} onChange={handleChange} className="w-full p-2 bg-[#0f171e] rounded" />
        <input name="poster" value={movie.poster || ""} onChange={handleChange} className="w-full p-2 bg-[#0f171e] rounded" />

        <button className="w-full bg-[#eb2626] text-black py-2 rounded">
          Update Movie
        </button>
      </form>
    </div>
  )
}

export default EditMovie
