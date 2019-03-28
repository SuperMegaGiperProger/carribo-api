const express = require('express');
const mysql = require('mysql');
const config = require('./config/db')

const app = express();
const port = 3000;

const connection = mysql.createConnection(config);
 
connection.connect();

app.get('/v1/ads/:id', (request, response) => {
    const id = request.params.id;
    connection.query(`SELECT * FROM ads WHERE ads.id = ${id}`, (err, result) => {
        if (err) throw err;
        response.send(result);
    });
});

app.put('/v1/ads/:id', (request, response) => {
    const id = request.params.id;
    response.send({
        "id": 3,
        "cost": 47000,
        "description": "Audi A3 for sale",
    });
});

app.delete('/v1/ads/:id', (request, response) => {
    //delete
    const id = request.params.id;
    connection.query(`DELETE FROM ads WHERE ads.id = ${id}`, (err, result) => {
        if (err) throw err;
        response.send(result);
    });
});

app.post('/v1/ads', (request, response) => {
    // insert
    response.send({
        "id": 3,
        "cost": 47000,
        "description": "Audi A3",
    });
});

app.get('/v1/ads', (request, response) => {
    connection.query('SELECT * FROM ads', (err, result) => {
        if (err) throw err;
        response.send(result);
    });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});