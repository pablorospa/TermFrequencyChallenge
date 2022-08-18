const express = require('express');

const docsController = require('../controllers/docs');

const router = express.Router();

router.get('/file_word_freq', docsController.fileWordFreq);
router.get('/repo_word_freq', docsController.repoWordFreq);

module.exports = router;
