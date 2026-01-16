import { useNavigate } from "react-router-dom"

const MovieCard = ({ title, rating, poster }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate("/home")}
      className="bg-[#1c2631] rounded-lg overflow-hidden shadow-lg 
                 hover:scale-105 transition duration-300 cursor-pointer"
    >
      {/* Poster */}
      <div className="w-full h-[260px] bg-gray-800 flex items-center justify-center">
        {poster ? (
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-white truncate">
          {title}
        </h3>

        <p className="text-[#eb2626] text-sm mt-1">
          ⭐ {rating || "N/A"}
        </p>
      </div>
    </div>
  )
}

export default MovieCard
