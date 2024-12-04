
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require("express-session")
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret-key', 
  resave: false,
  saveUninitialized: false
}))
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/GeoQuest', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected!'))
  .catch((err) => console.error('Connection error:', err));


app.get('/', (req, res) => {
    res.render("Home",{title: 'Home', 
      IfLogIn: req.session.IfLogIn, 
      Username: req.session.Username
}); 

});

const QuizGenRouter = require('./routes/QuizGenRouter');
const QuizRouter = require('./routes/QuizRouter');
const AboutRouter = require('./routes/AboutRouter');
const LearnMoreRouter = require('./routes/LearnMoreRouter');
const SignInRouter = require('./routes/SignInRouter');
const SignUpRouter = require('./routes/SignUpRouter');
const ProcessRouter = require('./routes/ProcessRouter');
const LogoutRouter = require('./routes/LogoutRouter');
const ResultRouter = require('./routes/ResultRouter')

app.use('/QuizGenRouter', QuizGenRouter);
app.use('/QuizRouter', QuizRouter);
app.use('/AboutRouter', AboutRouter);
app.use('/LearnMoreRouter',LearnMoreRouter);
app.use('/SignInRouter', SignInRouter);
app.use('/ProcessRouter', ProcessRouter);
app.use('/LogoutRouter', LogoutRouter);
app.use('/SignUpRouter', SignUpRouter);
app.use('/ResultRouter', ResultRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000'); // Log that the server has started
});


