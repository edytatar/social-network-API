// Import
const { Thought } = require('../models')

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(500))
    },

    // Get one thought by ID
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought ? res.status(404).json({ message: 'No thought found with that ID.' }) : res.json(thought))
            .catch((err) => res.status(500).json(err))
    },

    // Create a thought
    createThought({ body }, res) {
        Thought.create(body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },


    //Update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought ? res.status(404).json({ message: 'No thought found with that ID.' }) : res.json(thought))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //Delete a thought by ID
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought ? res.status(404).json({ message: 'No thought found with that ID.' }) : res.json({ message: 'Thought deleted.' }))
    },

    // Create a reaction
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $set: { reactions: body } },
            { runValidators: true, new: true })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then((thought) =>
                !thought ? res.status(404).json({ message: 'No thought found with that ID.' }) : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    // Delete a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: { reactions: req.body } },
            { new: true })
            .then((thought) =>
                !thought ? res.status(404).json({ message: 'No thought found with that ID.' }) : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
};
