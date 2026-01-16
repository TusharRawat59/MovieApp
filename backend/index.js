import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import movieRoutes from "./routes/movie.routes.js"
import adminRoutes from "./routes/admin.routes.js"  
import { createAdmin } from "./controllers/seedAdmin.js" 
import adminMovieRoutes from "./routes/adminMovie.routes.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// 🔹 CORS
app.use(
  cors({
    origin: "https://movieapp-ui.onrender.com",
    credentials: true
  })
)

// 🔹 MIDDLEWARES
app.use(express.json())
app.use(cookieParser())

// 🔹 ROUTES
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/movies", movieRoutes)
app.use("/api/admin", adminRoutes)   
app.use("/api/admin/movies", adminMovieRoutes)   

// 🔹 START SERVER + DB
app.listen(port, async () => {
  await connectDb()
  await createAdmin()   // 🔥 creates admin once
  console.log(`Server started on port ${port}`)
})
