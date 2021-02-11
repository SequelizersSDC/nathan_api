const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const port = 3000;

const app = express();

app.use(compression());
app.use(bp.json());
app.use(cors());
app.use(bp.urlencoded({extended: true}));

const speedTest = require('../database/index.js').speedTest;

app.get('/', (req, res) => {
    var receivedAt = Date.now();
    console.log('Request recieved.');
    speedTest(req, res, receivedAt);
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}.`);
})