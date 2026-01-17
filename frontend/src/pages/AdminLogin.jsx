import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const AdminLogin = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await axios.post(
        "https://movieapp-pj8n.onrender.com/api/admin/login",
        { email, password },
        { withCredentials: true }
      )

      if (res.status === 200) {
        // login success → go to admin dashboard
        navigate("/admin/dashboard")
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Admin login failed"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f171e] text-white">
      <div className="bg-[#1c2631] p-8 rounded-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-[#eb2626] mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#0f171e] outline-none text-white"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#0f171e] outline-none text-white"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#eb2626] text-black py-2 rounded font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

      </div>
    </div>
  )
}

export default AdminLogin
