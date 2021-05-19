const express = require('express')

const PetController = require('../controllers/pet-controller')

const router = express.Router()

router.get('/pets', PetController.getPets)
router.get('/pet/:id', PetController.showPet)
router.post('/pet', PetController.storePet)
router.put('/pet/:id', PetController.updatePet)

module.exports = router