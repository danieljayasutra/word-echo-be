const express = require('express');
const router = express.Router();
const easy = require('./data/easy.json');
const medium = require('./data/medium.json');
const hard = require('./data/hard.json');
const { ElevenLabsClient } = require('elevenlabs');


router.post('/', async (req, res, next) => {
  try {
    const id = req.body.id;
    const difficulty = req.body.difficulty;

    if (id == undefined && difficulty == undefined) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Field "id", "difficulty" is required',
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

    const client = new ElevenLabsClient({ apiKey: process.env.API_KEYS });

    const audioStream = await client.textToSpeech.convert('cgSgspJ2msm6clMCkdW9', {
      model_id: 'eleven_multilingual_v2',
      text: quiz.sentence,
    });

    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Transfer-Encoding', 'chunked');

    audioStream.pipe(res);

    audioStream.on('error', (err) => {
      console.error('Error streaming audio:', err);
      res.status(500).send('Error streaming audio');
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error?.message,
    });
  }
});

module.exports = router;

function findById(data, id) {
  return data.find((item) => item.id === id);
}
