const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const funfactsController = require('../../controllers/funfactsController');
const stateExists = require('../../middleware/stateExists');
const contigState = require('../../middleware/contigState');

router.route('/')
    .get(contigState, statesController.getAllStates)

router.route('/:code')
    .get(stateExists, statesController.getOneState);

router.route('/:code/capital')
    .get(stateExists, statesController.getCapital)

router.route('/:code/nickname')
    .get(stateExists, statesController.getNickname)

router.route('/:code/population')
    .get(stateExists, statesController.getPopulation)

router.route('/:code/admission')
    .get(stateExists, statesController.getAdmission)

router.route('/:code/funfact')
    .post(stateExists, funfactsController.createFunFact)
    .delete(stateExists, funfactsController.deleteFunFact)
    .patch(stateExists, funfactsController.updateFunFact)
    .get(stateExists, funfactsController.getRandomFunFact)

module.exports = router;