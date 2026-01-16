import jwt from "jsonwebtoken"

const isAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ message: "No token found" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied" })
    }

    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" })
  }
}

export default isAdmin