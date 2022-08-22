const express = require("express")
const app = express()
const cors = require('cors')
const config = require("./configs/config")
const { connectMongo } = require("./database/db")

app.use(cors())

app.use(express.json())

connectMongo.then(() => {
    console.log("DB connected")
})

app.use("/auth", require('./routes/auth'))
app.use("/notes", require('./routes/notes'))

app.listen(config.port, () => {
    console.log(`PORT UP AT ${config.port}`)
})

