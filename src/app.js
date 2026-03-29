const express = require("express")
const app = express()

app.use(express.json())

const taskRoutes = require("./routes/task.routes")

app.use(taskRoutes)

app.get("/", (req, res) => {
    res.json({ message: "Hello World" })
})

module.exports = app