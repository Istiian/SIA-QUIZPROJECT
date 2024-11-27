
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render("Home",{title: 'Home'}); 
});


const QuizGenRouter = require('./routes/QuizGenRouter');
const QuizRouter = require('./routes/QuizRouter');
const AboutRouter = require('./routes/AboutRouter');
const LearnMoreRouter = require('./routes/LearnMoreRouter');
const SignInRouter = require('./routes/SignInRouter');
const ProcessRouter = require('./routes/ProcessRouter');


app.use('/QuizGenRouter', QuizGenRouter);
app.use('/QuizRouter', QuizRouter);
app.use('/AboutRouter', AboutRouter);
app.use('/LearnMoreRouter',LearnMoreRouter);
app.use('/SignInRouter', SignInRouter);
app.use('/ProcessRouter', ProcessRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000'); // Log that the server has started
});


