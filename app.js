const express = require('express');
const morgan = require('morgan');

const audio = require('./audio');
const obtain = require('./quiz-obtain');
const verify = require('./quiz-verify');

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json({ limit: '1024kb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/status', (req, res) => {
  res.status(200).json({ data: 'OK' });
});

app.use('/audio', audio);
app.use('/quiz/obtain', obtain);
app.use('/quiz/verify', verify);

module.exports = app;
