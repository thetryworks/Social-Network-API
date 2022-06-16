const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

//get all thoughts
router
    .route('/')
    .get(getAllThoughts)
    
//create a thought and tie it to the user Id
router
    .route('/:userId')
    .post(createThought)

    //manipulate the thoughts by referencing the thought id
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

//create a reaction using the thought id
router
    .route('/:thoughtId/reactions')
    .post(createReaction)

//create a reaction based on the    
router
    .route('/:thoughtId/reactions/:reactionId')   
    .delete(deleteReaction)
    


module.exports = router;