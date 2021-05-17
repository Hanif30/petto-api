const express = require('express')

const PetController = require('../controllers/pet-controller')

const router = express.Router()

router.get('/pets', PetController.getPets)
router.post('/pet', PetController.storePet)

module.exports = router