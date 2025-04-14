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
    process.env.CLIENT_SURL, // (optional: add https if needed)
]

const corsOptions = {
    origin: function (origin, callback) {
        // allow requests with no origin like mobile apps or curl
        if (!origin) return callback(null, true)
        if (allowedOrigins.includes(origin)) {
            callback(null, true)
            console.log("CORS enabled for: ", origin)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true, // if you need cookies or auth
}

app.use(cors(corsOptions))

// Use body-parser middleware
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "build")))

app.use("/api", router)

app.use(errorMiddleware)

// Front app run requests
app.get((req, res) => {
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
