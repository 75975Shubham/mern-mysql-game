const express = require('express');
const router = express.Router();
const db = require('../db');

let randomNumber = null;
let remainingAttempts = 5;
//Start the game - genarate random no

router.get('/start', (req, res) => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    remainingAttempts = 5;
    console.log(`Random Number (secret): ${randomNumber}`); // for debugging
    res.json({ message: 'Game started! Guess the no between 1 and 100' });
});

//Guessing route
router.post('/guess', (req, res) => {
    const { name, guess } = req.body;
    if (randomNumber === null) {
        return res.status(400).json({ message: 'Game not started yet!' });
    }



    if (guess == randomNumber) {
        let attemptsUsed = 5 - remainingAttempts;
        let score = 100 - (attemptsUsed - 1) * 20;
        if (score < 20) score = 20;

        //Save the winner to MySQL
        db.query(
            'INSERT INTO winners(name, score) VALUES (?,?)',
            [name, score],
            (err, result) => {
                if (err) {
                    console.error('Error saving winner:', err);
                    return res.status(500).json({ message: 'Error saving winner' });
                }
                randomNumber = null;
                res.json({ message: 'Correct🎉🎉, Your score: ', score });
            }
        );


    } else {
        remainingAttempts--;
        if (remainingAttempts <= 0) {
            const actualNumber = randomNumber;
            randomNumber = null;
            return res.json({ message: `Game over! The number was ${actualNumber}.` });
        }

        if (guess < randomNumber) {
            return res.json({ message: 'Too Low!!', attemptsLeft: remainingAttempts });
        } else {
            return res.json({ message: 'Too high', attemptsLeft: remainingAttempts });
        }
    }
});
module.exports = router;