const { User } = require('../models');

const userController = {
  //find all users and their thoughts
    getAllUsers(req, res) {
        User.find({})
          .populate({
            path: 'thoughts',
            select: '-v'
          })
          .select('-_v')
          .sort({_id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    
      // get one user by id with their thoughts
      getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: 'thoughts',
            select: '-_v'
          })
          .select('-_v')
          .then(dbUserData => {
            // If no user is found, send 404
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
      //create a new user with no extra data yet since it has not been created
      createUser({ body }, res) {
        User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.status(400).json(err));
      },
      //allows user to be updated
      updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
      },
      //pushes a friend Id onto a user
      addFriend({ params }, res) {
        User.findOneAndUpdate(
          {_id: params.userId },
          { $push: { friends: params.friendId } },
          { new: true, runValidators: true }
        )
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
      },
        
      removeFriend({ params }, res) {
        User.findOneAndUpdate(
          {_id: params.userId },
          { $push: { friends: params.friendId } },
          { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
      },

      deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
      }
};

module.exports = userController;