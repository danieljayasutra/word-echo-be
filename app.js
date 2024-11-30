const express = require('express');
const morgan = require('morgan');

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json({ limit: '1024kb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/status', (req, res) => {
  res.status(200).json({ data: 'OK' });
});

module.exports = app;
