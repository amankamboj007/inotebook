const router = require("express").Router()
const notesModel = require("../models/notes")
const config = require("../configs/config")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const { fetchUser } = require("../middleware/jwt")


router.get("/fetch-all-notes", fetchUser, async (req, res) => {
    try {
        let notes = await notesModel.find({ userId: req.user })
        res.send(notes).status(200)

    } catch (error) {
        console.log(error)
        res.send(error).status(500)
    }
})

router.post("/add-notes", [
    body("title", "Please add title with more than 3 letter").isLength({ min: 3 }),
    body("description", "Please add description with more than 3 letter").isLength({ min: 3 })
], fetchUser, async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            throw error
        }
        let notes = {
            title: req.body.title,
            description: req.body.description,
            userId: req.user,
            tag: req.body.tag
        }
        let response = await notesModel.create(notes)
        res.send(response).status(200)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error || error.message || error.array() });
    }
})

router.put("/update-notes/:id", fetchUser, async (req, res) => {
    try {
        let notes = await notesModel({ _id: req.params.id, userId: req.user })
        let { tag, title, description } = req.body;
        let update = {};
        if (tag) { update.tag = tag }
        if (title) { update.title = title }
        if (description) { update.description = description }

        notes = await notesModel.findOneAndUpdate({ _id: req.params.id }, { $set: update }, { new: true })
        res.send(notes)
    } catch (error) {
        console.log(error)
        res.send(error).status(500)

    }
})

router.delete("/delete/:id", fetchUser, async (req, res) => {
    try {
        let noteExists = await notesModel.findOne({ _id: req.params.id, userId: req.user })

        if (!noteExists) {
            throw ("Invalid notes Id ")
        }
        await notesModel.deleteOne({ _id: noteExists._id })
        res.send("deleted sucessfully")
    } catch (error) {
        console.log(error)
        res.send(error).status(500)
    }
})





module.exports = router