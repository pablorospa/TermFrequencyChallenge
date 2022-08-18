const fs = require('fs');
const path = require('path');

const sequelize = require('sequelize');

// Import sequelize model
const WordFreq = require('../models/docs');

// Resolve docs path
const docsFolder = path.resolve('./docs/');

const normalizeText = (text) => {
  // Replace linebreakes and tabs for spaces
  let normalizedText = text.toLowerCase().replace(/\r\n/gi, ' ');

  // Accents replaced until correct config of databse collation and charset
  normalizedText = normalizedText.replace(/[àáâãäå]/g, 'a');
  normalizedText = normalizedText.replace(/[èéêë]/g, 'e');
  normalizedText = normalizedText.replace(/[ìíîï]/g, 'i');
  normalizedText = normalizedText.replace(/[òóôõö]/g, 'o');
  normalizedText = normalizedText.replace(/[ùúûü]/g, 'u');

  // Replace none alphabetical characters for \s and ñ
  normalizedText = normalizedText.replace(/[^a-z\sñÑ]/gi, ' ');
  return normalizedText;
};

//  CALCULATE WORD FREQUENCIES FOR EACH FILE
async function filesWordFreq() {
  console.log('--- START Word Frequency Calculation ---');
  console.log('');

  const files = fs.readdirSync(docsFolder);

  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    const text = fs.readFileSync(path.join(docsFolder, file), { encoding: 'utf8' });
    console.log(`File ${file} read`);

    const normalizedText = normalizeText(text);
    const wordArray = normalizedText.split(/\s+/);

    // Calc frequency
    const wordDictionary = Object.create(null);
    wordArray.forEach((word) => {
      if (!(word in wordDictionary)) {
        wordDictionary[word] = 1;
      } else {
        wordDictionary[word] += 1;
      }
    });

    // Convert data to list and format for query placeholder
    const wordList = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(wordDictionary)) {
      wordList.push({ file, word: key, frequency: wordDictionary[key] });
    }

    // Execute insert and await result
    // eslint-disable-next-line no-await-in-loop
    await WordFreq.bulkCreate(wordList)
      .then(() => {
        console.log(`${file} words inserted`);
      })
      .catch(console.log);
  }
  console.log('');
  console.log('--- END of file processing ---');
  console.log('');
}

// TOTALIZE WORD FREQUENCIES
async function sumTotalFreq() {
  console.log('--- START Total frequency summarization ---');
  console.log('');

  const wordFreqs = await WordFreq.findAll({
    raw: true,
    attributes: [
      'word',
      [sequelize.fn('sum', sequelize.col('frequency')), 'frequency'],
    ],
    group: ['word'],
  });
  console.log(`Summarized ${wordFreqs.length} words`);

  // Format query response for bulk insert
  const repoWordList = wordFreqs.map((i) => ({ ...i, file: 'repository' }));

  // Insert summarized fequencies
  if (process.env.INSERT_TYPE === 'slow') {
    // Slow insert for Digital Ocean
    console.log('Attempting slow insert');
    // eslint-disable-next-line no-restricted-syntax
    for (const summItem of repoWordList) {
      // eslint-disable-next-line no-await-in-loop
      await WordFreq.create(summItem)
        .then(() => {
          console.log(`Word: ${summItem.word}`);
        })
        .catch(console.log);
    }
  } else {
    console.log('Attempting bulk insert');
    await WordFreq.bulkCreate(repoWordList)
      .then(() => {
        console.log('Sumarization insertion in database completed');
      })
      .catch(console.log);
  }
}

async function main() {
  await filesWordFreq();
  await sumTotalFreq();
  console.log('');
  console.log('--- File processing completed SUCCESFULLY ---');
  console.log('');
  console.log('');
  process.exit();
}

main();
