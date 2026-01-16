import { Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"

import Landing from "./pages/Landing"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import AddMovie from "./pages/AddMovie"
import EditMovie from "./pages/EditMovie"

import { userDataContext } from "./context/UserContext"

function App() {
  const { userData } = useContext(userDataContext)

  return (
    <Routes>
      {/* Public Landing */}
      <Route path="/" element={<Landing />} />

      {/* User Auth Pages */}
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/home" />}
      />
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/home" />}
      />

      {/* User Home (Protected) */}
      <Route
        path="/home"
        element={userData ? <Home /> : <Navigate to="/signin" />}
      />

      {/* Admin Login */}
      <Route path="/admin" element={<AdminLogin />} />

      {/* Admin Pages */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/add-movie" element={<AddMovie />} />
      <Route path="/admin/edit-movie/:id" element={<EditMovie />} />

    </Routes>
  )
}

export default App
