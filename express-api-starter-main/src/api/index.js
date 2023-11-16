const express = require('express');

const emojis = require('./emojis');
const yoli = require('./yoli');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/yoli', yoli);

module.exports = router;
