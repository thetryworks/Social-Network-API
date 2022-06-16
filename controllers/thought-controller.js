const { Thought, User } = require('../models');

const thoughtController = {
    //retrieve all thoughts with corresponding user id
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'username',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    },

    //get one thought by ID and all of the user info
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .populate({
                path: 'username',
                select: '-__v'
            })
           .select('-__v')
           .sort({ _id: -1 })
           .then(dbThoughtData => res.json(dbThoughtData))
           .catch(err => {
               console.log(err);
               res.status(500).json(err)
           })
    },

    //create thought and save it to a certain user
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Incorrect thought data!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    //add reaction to a thought by that thought id
    createReaction ({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this ID!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },

    //delete a reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.reactionId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    //update a thought by Id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, 
            body,
            { new: true, runValidators: true }
        )
        .then(updatedThought => {
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with this ID!' });
            }
        res.json(updatedThought);
        })
        .catch(err => res.json(err));
    },

    //delete a thought by id
    deleteThought({ params, body}, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this ID!'})
            }
            res.json(deletedThought);
        })
        .catch(err => res.json(err));
    }
};


module.exports = thoughtController;