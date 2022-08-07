const dotenv = require("dotenv")

dotenv.config()

let config = {
    port: process.env.port,
    mongoURI: process.env.mongoURI,
    jwtSecret: process.env.secret,
    saltRound: process.env.salt
}

module.exports = config