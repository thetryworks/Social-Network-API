const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../..controllers/thought-controller');

router.route('/:userId').post(createThought);

router
    .route('/:userId/:thoughtId')
    .put(createReaction)
    .delete(deleteThought)

router.route('/:userId/:thoughtId/:reactionId').delete(deleteReaction);


module.exports = router;