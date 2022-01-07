const express = require("express")
const app = express()

const heroesRoutes = require("./routes/heroes")

app.use(express.json())

app.use('/heroes', heroesRoutes)

module.exports = app