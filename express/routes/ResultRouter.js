const express = require('express');

const router = express.Router();
const User = require('../models/User.model');

// Middleware to parse JSON request body
router.use(express.json());

router.post('/', async (req, res) => {
    const { FinalScore, Correct,Incorrect } = req.body;

    username = req.session.Username;
    try {
        // Find the user by username
        const user = await User.findOne({ Username: username });

        if (user) {
            // Update the score if it's higher than the current highest score
            if (FinalScore > user.HighestScore) {
                user.HighestScore = FinalScore;
                await user.save();
                
            } else {
                
            }
        } else {
            // res.json({ message: 'User not found.', status: 'error' });
        }
    } catch (err) {
        console.error(err);
        // res.json({ message: 'Error saving score.', status: 'error' });
    }
});

module.exports = router;