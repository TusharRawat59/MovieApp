import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AddMovie = () => {
  const navigate = useNavigate()

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: "",
    releaseDate: "",
    duration: "",
    poster: ""
  })

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post(
        "https://movieapp-backend-4at2.onrender.com/api/admin/movies",
        movie,
        { withCredentials: true }
      )
      navigate("/admin/dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f171e] text-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1c2631] p-8 rounded-lg w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#eb2626]">
          Add Movie
        </h2>

        <input name="title" placeholder="Title" onChange={handleChange} required className="w-full p-2 bg-[#0f171e] rounded" />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 bg-[#0f171e] rounded" />
        <input name="rating" type="number" step="0.1" placeholder="Rating" onChange={handleChange} required className="w-full p-2 bg-[#0f171e] rounded" />
        <input name="releaseDate" type="date" onChange={handleChange} className="w-full p-2 bg-[#0f171e] rounded" />
        <input name="duration" type="number" placeholder="Duration (min)" onChange={handleChange} className="w-full p-2 bg-[#0f171e] rounded" />
        <input name="poster" placeholder="Poster URL" onChange={handleChange} className="w-full p-2 bg-[#0f171e] rounded" />

        <button className="w-full bg-[#eb2626] text-black py-2 rounded font-semibold">
          Add Movie
        </button>
      </form>
    </div>
  )
}

export default AddMovie
