require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")

const app = express()
const path = require("path")
const PORT = process.env.PORT || 5001
const bodyParser = require("body-parser")
const router = require("./src/routes/router")
const errorMiddleware = require("./src/middlewares/error-middleware")
const cors = require("cors")

// access for every user

const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.CLIENT_SURL,
    "http://localhost:5000", // (optional: add https if needed)
]

const corsOptions = {
    origin: function (origin, callback) {
        console.log("Request Origin:", origin)
        console.log("Allowed Origins:", allowedOrigins)

        // Allow requests with no origin (e.g., mobile apps or curl)
        if (!origin) return callback(null, true)

        if (allowedOrigins.includes(origin)) {
            console.log("CORS enabled for:", origin)
            return callback(null, true)
        } else {
            console.warn("CORS blocked for:", origin)
            return callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}

console.log("Allowed origins: ", allowedOrigins)

console.log("Long time to load")

app.use(cors(corsOptions))

// Use body-parser middleware
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api", router)

app.use(errorMiddleware)
app.use((err, req, res, next) => {
    if (err.message === "Not allowed by CORS") {
        console.error("CORS error:", err.message)
        return res.status(403).json({ error: "CORS policy: Not allowed" })
    }
    next(err)
})

// Front app run requests
app.use(express.static(path.join(__dirname, "build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})
const startApp = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port - ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startApp()
