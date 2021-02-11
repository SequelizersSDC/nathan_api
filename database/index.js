const { random } = require('faker');
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'questions',
    password: 'password'
});

const speedTest = (req, res) => {
    var randomEntryID = Math.floor(Math.random() * Math.floor(1000000));
    var before = Date.now();
    client.query(`select * from questions where questionid = 'q${randomEntryID}';`, (err, success) => {
        if (err) {
            console.log(err);
            res.end();
            return;
        }
        var after = Date.now();
        console.log(success.rows);
        res.send(`${after - before}ms \n ${JSON.stringify(success.rows)}`);
        res.end();
    });
};

client.connect();

module.exports.client = client;
module.exports.speedTest = speedTest;