const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  const difficulty = req.body.difficulty;

  if (difficulty == undefined) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Field "difficulty" are required',
    });
  }

  res.status(200).json({});
});

module.exports = router;
