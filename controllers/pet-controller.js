const Pet = require('../models/pets')
const createError = require('http-errors')
const mongoose = require('mongoose')

getPets = async (req, res) => {
    await Pet.find({}, (err, pets) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!pets.length) {
            return res
                .status(400)
                .json({ success: false, error: 'Pet not found' })
        }
        return res.status(200).json({ success: true, data: pets})
    }).catch(err => {
        console.log(err)
        return res.status(400).json({ success: false, error: err })
    })
}

showPet = async (req, res, next) => {
    const id = req.params.id
    
    try {
        const pet = await Pet.findById({ _id: req.params.id })

        if(!pet) {
            throw createError(404, 'Pet not found')
        }

        res.status(200).json({ success: true, data: pet })
    } catch (error) {
        console.log(error)
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Id'))
        }
        next(error)
    }
}

storePet = (req, res) => {
    const body = req.body
    console.log(body)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    const pet = new Pet(body)

    if (!pet) {
        return res.status(400).json({ success: false, message: 'Pet store failed'})
    }

    pet.save().then(() => {
        return res.status(200).json({
            success:true,
            id: pet._id,
            message: 'Pet stored',
        })
    }).catch(err => {
        return res.status(400).json({
            success: false,
            error: err,
            message: 'Pet store failed',
        })
    })
}

module.exports = {
    getPets,
    showPet,
    storePet,
}