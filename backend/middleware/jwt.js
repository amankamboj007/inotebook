const jwt = require("jsonwebtoken")
const config = require("../configs/config")

const createToken = (data) => {
    let token = jwt.sign({ id: data }, config.jwtSecret, { expiresIn: '24h' })
    return token;
}
const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please enter a valid token" })
    } try {
        const data = jwt.verify(token, config.jwtSecret)
        req.user = data.id
        next()
    } catch (error) {
        res.status(401).send({ error: "Please enter a valid token" })

    }
}

module.exports = {
    createToken,
    fetchUser
} 