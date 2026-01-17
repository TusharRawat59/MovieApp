import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    // check admin exists
    const admin = await User.findOne({ email, role: "admin" })
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" })
    }

    // check password
    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // generate token
    const token = jwt.sign(
      {
        userId: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.cookie("token", token, {
      httpOnly: true,
      sameSite:"none",
      secure: true
    })

    res.status(200).json({
      message: "Admin login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Admin login failed" })
  }
}
