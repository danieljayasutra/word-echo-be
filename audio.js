const express = require('express');
const router = express.Router();
const easy = require('./data/easy.json');
const medium = require('./data/medium.json');
const hard = require('./data/hard.json');

router.post('/', (req, res, next) => {
  const difficulty = req.body.difficulty;
  const excludedIds = req.body.excludedIds;

  if (difficulty == undefined) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Field "difficulty" are required',
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

  let text;
  if (difficulty === 'easy') {
    text = getRandomData(easy, excludedIds);
  }
  if (difficulty === 'medium') {
    text = getRandomData(medium, excludedIds);
  }
  if (difficulty === 'hard') {
    text = getRandomData(hard, excludedIds);
  }

  

  res.status(200).json({
    text: text,
  });
});

module.exports = router;

function getRandomData(data, excludedIds) {
  // Filter data to remove elements with IDs that are in excludedIds
  const filteredData = data.filter((item) => !excludedIds.includes(item.id));

  // If no data remains after the filter, return null.
  if (filteredData.length === 0) {
    return null;
  }

  // Randomly select elements from filtered data
  const randomIndex = Math.floor(Math.random() * filteredData.length);
  return filteredData[randomIndex];
}
