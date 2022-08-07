const mongoose = require("mongoose")
const config = require("../configs/config")

const connectMongo = mongoose.connect(config.mongoURI)

module.exports = {
    connectMongo
}