import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const createAdmin = async () => {
  const adminExists = await User.findOne({ role: "admin" })
  if (adminExists) return

  const hashedPassword = await bcrypt.hash("admin123", 10)

  await User.create({
    name: "Admin",
    email: "admin@gmail.com",
    password: hashedPassword,
    role: "admin",
  })

  console.log("Admin created: admin@gmail.com / admin123")
}