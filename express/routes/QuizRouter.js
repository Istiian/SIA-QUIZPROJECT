const express = require('express');
const axios = require('axios');
const he = require('he');
const router = express.Router();
const User = require('../models/User.model');

// Decode HTML entities ex. double and single quotes
function decodeEntities(text) {
    return he.decode(text);
}



router.get('/', async (req, res) => {
    const category = 22;
    const amount = 20;
    const difficulty = "hard";
    
    try {
        // Fetch data from OpenTDB
        const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`);

        const questions = response.data.results.map(question => ({
            ...question,
            question: decodeEntities(question.question),
            correct_answer: decodeEntities(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map(answer => decodeEntities(answer))
        }));
        const response_code = response.data.response_code;
        const correct_answers = questions.map(question => question.correct_answer);
        const combinedQuestions = questions.map(question => ({
            ...question,
            all_answers: [question.correct_answer, ...question.incorrect_answers]
        }));

        Username = req.session.Username;
        const users = await User.findOne({ Username: Username });
        
        console.log(users.HighestScore);
        //Validation If There is insufficient amount of number of questions
        if (response_code === 0) {
            console.log(req.session.Username);
            res.render('Quiz', { questions, correct_answers, combinedQuestions, IfLogIn: req.session.IfLogIn, Username: req.session.Username, HighestScore: users.HighestScore });
            
        } else {
            res.render('QuizGen', { Error: 'ERROR' });
            console.log(response_code);
        } 
    } catch (error) {
            // res.status(500).send('Error retrieving data from OpenTDB');
            // res.render('QuizGen', {IfLogIn: req.session.IfLogIn, Username: req.session.Username }); 
            res.redirect('/QuizRouter');
    }
});

module.exports = router;
