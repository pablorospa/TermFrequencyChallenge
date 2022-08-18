const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const docsRoute = require('./routes/docs');

app.use(docsRoute);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000);
console.log('------- API STARTED -------');
