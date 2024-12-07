const express = require('express');
const router = express.Router();
const easy = require('./data/easy.json');
const medium = require('./data/medium.json');
const hard = require('./data/hard.json');
const { getRandomData } = require('./utils');

router.post('/', async (req, res, next) => {
  const difficulty = req.body.difficulty;
  const excludedIds = req.body.excludedIds;

  if (difficulty == undefined) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Field "difficulty" is required',
    });
  }

  if (difficulty !== 'easy' && difficulty !== 'medium' && difficulty !== 'hard') {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Field "difficulty" should be easy, medium or hard',
    });
  }

  if (!Array.isArray(excludedIds)) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Field "excludedIds" should be array of id',
    });
  }

  let quiz;
  if (difficulty === 'easy') {
    quiz = getRandomData(easy, excludedIds);
  }
  if (difficulty === 'medium') {
    quiz = getRandomData(medium, excludedIds);
  }
  if (difficulty === 'hard') {
    quiz = getRandomData(hard, excludedIds);
  }
  console.log(quiz);
  res.status(200).json(quiz);
});

module.exports = router;
