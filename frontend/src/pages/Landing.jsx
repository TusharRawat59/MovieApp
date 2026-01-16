import { useNavigate } from "react-router-dom"
import heroBg from "../assets/heroBg.jpg"



const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0f171e] text-white">

      {/* HERO SECTION */}
      <div
        className="h-[100vh] flex flex-col items-center justify-center text-center px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-[#eb2626]">
         MovieImdb
        </h1>

        <p className="mt-4 text-lg text-gray-300">
          Discover Top Rated Movies & Reviews
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex gap-6">
          <button
            onClick={() => navigate("/admin")}
            className="bg-[#eb2626] text-black px-8 py-3 rounded-md font-semibold hover:bg-[#eb2626] transition"
          >
            Admin
          </button>

          <button
            onClick={() => navigate("/signin")}
            className="border-2 border-[#eb2626] text-[#eb2626] px-8 py-3 rounded-md font-semibold hover:bg-[#eb2626] hover:text-black transition"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* MOVIE SECTION */}
      {/* <div className="px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">
          Top Movies
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            "Inception",
            "Interstellar",
            "The Dark Knight",
            "Forrest Gump",
            "Gladiator",
            "Avatar",
          ].map((movie, index) => (
            <div
              key={index}
              className="bg-[#1c2631] h-[260px] rounded-lg flex items-center justify-center text-[#eb2626] font-semibold hover:scale-105 transition cursor-pointer"
            >
              {movie}
            </div>
          ))}
        </div>
      </div> */}

    </div>
  )
}

export default Landing
