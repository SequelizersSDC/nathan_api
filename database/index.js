const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'questions',
    password: 'password'
});

client.connect();

module.exports.client = client;