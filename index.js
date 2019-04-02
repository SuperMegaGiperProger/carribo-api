const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const dbConfig = require('./config/db');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const HandlerGenerator = require('./jwt/HandlerGenerator');

const app = express();
const port = 3000;

const connection = mysql.createConnection(dbConfig); 
connection.connect();

const handlers = new HandlerGenerator();

const destinationCountry = 'Belarus';

function calculateFinalCost(ad) {
    return new Promise ((resolve, reject) => {
        const countryName = `SELECT country_name FROM locations WHERE id = ${ad.location_id}`;
        connection.query(`SELECT formula FROM cost_dependencies WHERE destination_country_name = '${destinationCountry}'
        and source_country_name = (${countryName})`, (err, result) => {
            if (err) {
                reject(err);
            }
            const payload = result[0] ? result[0].formula : '';
            resolve(payload);
        });
    });
}

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());

app.post('/v1/login', handlers.login);

app.get('/v1/ads/:id', (req, res) => {
    const id = req.params.id;
    connection.query(`SELECT * FROM ads WHERE ads.id = ${id}`, (err, result) => {
        if (err) throw err;
        calculateFinalCost(result[0]).then((finalCost) => {
            result[0].finalCost = finalCost ? Math.round(eval(finalCost.replace('{cost}', result[0].cost))) : result[0].cost;            
            res.send(result[0]);
        });
    });
});

app.put('/v1/ads/:id', middleware.checkToken, (req, res) => {
    //update
    const id = req.params.id;
    connection.query(`SELECT author_id FROM ads WHERE id = ${id}`, (err, result) => {
        if (result[0] && result[0].author_id === req.user.id) {
            res.send({
                "id": 3,
                "cost": 47000,
                "description": "Audi A3 for sale",
            });
        } else {
            res.sendStatus(403);
        }
    });
});

app.delete('/v1/ads/:id', middleware.checkToken, (req, res) => {
    const id = req.params.id;
    connection.query(`SELECT author_id FROM ads WHERE id = ${id}`, (err, result) => {
        if (result[0].author_id === req.user.id) {
            connection.query(`DELETE FROM ads WHERE ads.id = ${id}`, (err, result) => {
                res.sendStatus(204);
            });
        } else {
            res.sendStatus(403);
        }
    });
});

app.post('/v1/ads', middleware.checkToken, (req, res) => {
    // insert
    // connection.query(`INSERT INTO ads (cost, description, header, )`, (err, result) => {
    res.send({
        "id": 3,
        "cost": 47000,
        "description": "Audi A3",
    });
});

app.get('/v1/ads', (req, res) => {
    connection.query('SELECT * FROM ads', (err, result) => {
        if (err) throw err;

        const promises = [];
        result.forEach((ad) => {            
            promises.push(calculateFinalCost(ad).then((finalCost) => {       
                ad.finalCost = finalCost ? Math.round(eval(finalCost.replace('{cost}', ad.cost))) : ad.cost;
            }));
        });

        Promise.all(promises).then(() => {
            res.send(result);
        })
    });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});
