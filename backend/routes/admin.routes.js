import express from "express"
import { adminLogin } from "../controllers/admin.controller.js"

const router = express.Router()

router.post("/login", adminLogin)

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  })
  res.status(200).json({ message: "Admin logged out successfully" })
})

export default router