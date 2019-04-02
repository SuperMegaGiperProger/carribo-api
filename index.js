const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const dbConfig = require('./config/db');
const jwtConfig = require('./config/jwt.js');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const HandlerGenerator = require('./jwt/HandlerGenerator');

const app = express();
const port = 3000;

const connection = mysql.createConnection(dbConfig); 
connection.connect();

const handlers = new HandlerGenerator();

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());

app.post('/login', handlers.login);
app.get('/', middleware.checkToken, (req, res) => {
    jwt.verify(req.token, jwtConfig.secret, (err, authorizedData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Successful log in',
                authorizedData,
            });
        }
    });
});

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