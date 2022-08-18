const errorController = require('./error');

const WordFreq = require('../models/docs');

exports.fileWordFreq = (req, res) => {
  const { term } = req.query;
  const docName = req.query.doc_name;

  if (!term || !docName) {
    errorController.error400(res);
  } else {
    WordFreq.findAll({
      attributes: ['frequency'],
      where: {
        word: term,
        file: docName,
      },
    })
      .then((result) => {
        if (!result) {
          res.status(200).json({ frequency: 0 });
        } else {
          res.status(200).json(result[0]);
        }
      });
  }
};

exports.repoWordFreq = (req, res) => {
  const { term } = req.query;

  if (!term) {
    errorController.error400(res);
  } else {
    WordFreq.findAll({
      attributes: ['frequency'],
      where: {
        word: term,
        file: 'repository',
      },
    })
      .then((result) => {
        if (!result) {
          res.status(200).json({ frequency: 0 });
        } else {
          res.status(200).json(result[0]);
        }
      });
  }
};
