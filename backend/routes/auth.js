const router = require("express").Router()
const userModel = require("../models/users")
const config = require("../configs/config")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const { createToken, fetchUser } = require("../middleware/jwt")

router.post("/add-user", [
    body('name', 'Name should be more than 3 char').isLength({ min: 3 }),
    body('email', 'Please put email  in valid Format').isEmail(),
    body('password', "Password should be more than 3 char ").isLength({ min: 5 })
], async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            throw error
        }
        let userExists = await userModel.findOne({ email: req.body.email })
        if (userExists) {
            throw ("User exists")
        }

        const salt = await bcrypt.genSalt(Number(config.saltRound))
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        delete req.body.password;
        req.body.password = hashedPassword;
        let response = await userModel.create(req.body)
        if (response) {
            let authtoken = await createToken(response._id)
            res.send({ authtoken }).status(200)
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error || error.message || error.array() });
    }

})

router.post("/login", [
    body('email', 'Please put email  in valid Format').isEmail(),
    body('password', "Password should be more than 3 char ").isLength({ min: 5 })
], async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            throw error
        }
        let userExists = await userModel.findOne({ email: req.body.email })
        if (!userExists) {
            throw ("user not exists")
        }
        let verify = await bcrypt.compare(req.body.password, userExists.password)
        if (!verify) {
            throw ("email or password is invalid ")
        }
        let authtoken = await createToken(userExists._id)
        res.send({ authtoken, message: "user logged In" }).status(200)

    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error || error.message || error.array() });
    }
}
)

router.post("/fetchUser", fetchUser, async (req, res) => {
    try {
        let userExists = await userModel.findOne({ id: req.user }, { password: 0 })
        if (!userExists) {
            throw ("user not exists")
        }
        res.send(userExists).status(200)
    } catch (error) {
        return res.status(400).json({ error: error });

    }

})

module.exports = router