const express = require('express');
const axios = require('axios');
const he = require('he');
const router = express.Router();

// Decode HTML entities ex. double and single quotes
function decodeEntities(text) {
    return he.decode(text);
}

router.get('/', function(req, res) {
    res.render('Quiz', { title: 'Quiz' });
});

router.post('/', async (req, res) => {
    const category = 22;
    const amount = req.body.Amount;
    const difficulty = req.body.Difficulty;
    const type = req.body.Type;
    try {
        // Fetch data from OpenTDB
        const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`);
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
        //Validation If There is insufficient amount of number of questions
        if (response_code === 0) {
            res.render('Quiz', { questions, correct_answers, combinedQuestions });
        } else {
            res.render('QuizGen', { Error: 'ERROR' });
            console.log(response_code);
        } 
    } catch (error) {
        try {
            const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`);
            const questions = response.data.results.map(question => ({
                ...question,
                question: decodeEntities(question.question),
                correct_answer: decodeEntities(question.correct_answer),
                incorrect_answers: question.incorrect_answers.map(answer => decodeEntities(answer))
            }));
            const correct_answers = questions.map(question => question.correct_answer);
            const combinedQuestions = questions.map(question => ({
                ...question,
                all_answers: [question.correct_answer, ...question.incorrect_answers]
            }));
            //Validation If There is insufficient amount of number of questions
            if (response_code === 0) {
                res.render('Quiz', { questions, correct_answers, combinedQuestions });
            } else {
                res.render('QuizGen', { Error: 'ERROR' });
                console.log(response_code);
            }
        } catch (error) {
            res.status(500).send('Error retrieving data from OpenTDB');
        }
    }
});

module.exports = router;
