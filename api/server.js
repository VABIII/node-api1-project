// BUILD YOUR SERVER HERE
const express = require('express')

const server = express()

server.use(express.json())

const Users = require('./users/model')

server.post('/api/users', async (req, res) => {
    const { name, bio } = req.body
    try {
        if(!name || !bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            const newUser = Users.insert({name, bio})
            res.status(201).json(newUser)
        }

    }
    catch (err) {
        res.status(500).json({
            message: "There was an error while saving the user to the database",
            error: err.message
        })
    }
})


server.get("/api/users", async (req, res) => {
    try {
        const users = await Users.find()
        res.json(users)
    }
    catch (err) {
        res.status(500).json({
            message: 'The users information could not be retrieved',
            error: err.message,
        })
    }
})



module.exports = server; // EXPORT YOUR SERVER instead of {}




























