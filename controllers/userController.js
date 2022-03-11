// Importing
const User = require('../models/User');

module.exports = {

    // Get all users
    getUsers(req, res) {
        User.find({})
            .then(users => res.json(users))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Get a user by ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user ? res.status(404).json({ message: 'No user found with that ID.' }) : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Create a user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    // Update user by ID
    updateUser(req, res) {
        User.findOneAndUpdate(
            { users: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user ? res.status(404).json({ message: 'No user found with that ID.' }) : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Delete user by ID
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user ? res.status(404).json({ message: 'No user found with that ID.' }) : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },

    // Create a friend
    createFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: { friends: req.body } },
            { runValidators: true, new: true })
            .then((user) =>
                !user ? res.status(404).json({ message: 'No user found with that ID.' }) : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // Delete a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: { friends: req.body.friendId } },
            { new: true })
            .then((user) =>
                !user ? res.status(404).json({ message: 'No user found with that ID.' }) : res.json(user))
            .catch((err) => res.status(500).json(err))
    }
};