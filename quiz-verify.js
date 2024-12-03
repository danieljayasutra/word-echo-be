const express = require('express');
const router = express.Router();
const easy = require('./data/easy.json');
const medium = require('./data/medium.json');
const hard = require('./data/hard.json');

router.post('/', async (req, res, next) => {
  const verifyText = req.body.verifyText;
  const difficulty = req.body.difficulty;
  const id = req.body.id;

  if (verifyText == undefined || id == undefined || difficulty == undefined) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Field "difficulty", "id", "verifyText" are required',
    });
  }

  if (difficulty !== 'easy' && difficulty !== 'medium' && difficulty !== 'hard') {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Field "difficulty" should be easy, medium or hard',
    });
  }

  let quiz;
  if (difficulty === 'easy') {
    quiz = findById(easy, id);
  }
  if (difficulty === 'medium') {
    quiz = findById(medium, id);
  }
  if (difficulty === 'hard') {
    quiz = findById(hard, id);
  }

  if (quiz == undefined) {
    res.status(404).json({
      error: 'Bad Request',
      message: 'Id not found',
    });
  }

  const isSame = quiz.sentence === verifyText;

  if (isSame) {
    res.status(200).json({
      ...quiz,
      verifyText,
      isSame,
    });
  } else {
    res.status(200).json({
      ...quiz,
      verifyText,
      isSame,
    });
  }
});

module.exports = router;

function findById(data, id) {
  return data.find((item) => item.id === id);
}
