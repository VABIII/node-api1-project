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

server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await Users.findById(id)
        if(!user) {
            res.status(404).json({
                message: "The user information could not be retrieved"
            })
        } else {
            res.json(user)
        }
    }
    catch (err) {
        res.status(404).json({
            message: `User with id ${id} not found`,
            error: err.message,
        })
    }
})

server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deletedUser = await Users.remove(id)
        if(!deletedUser){
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else {
            res.json(deletedUser)
        }
    }
    catch (err) {
        res.status(404).json({
            message: "The user could not be removed",
            error: err.message
        })
    }
})

server.put("/api/users/:id", async (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    try {
        const updatedUser = await Users.update(id, {name, bio})
        if(!name || !bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else if (!updatedUser){
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        }
        else {
            res.status(200).json(updatedUser)
        }
    }
    catch (err) {
        res.status(500).json({
            message: "The user information could not be modified",
            error: err.message,
        })
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}




























