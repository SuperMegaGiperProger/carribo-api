const express = require('express');
const app = express();
const port = 3000;

app.get('/ads/:id', (request, response) => {
    //select
    console.log(request.params.id);
    response.send({
        "id": 4,
        "cost": 80000,
        "description": "Volvo XC90",
    });
});

app.put('/ads/:id', (request, response) => {
    //update
    console.log(request.params.id);
    response.send({
        "id": 3,
        "cost": 47000,
        "description": "Audi A3 for sale",
    });
});

app.delete('/ads/:id', (request, response) => {
    //delete
    console.log(request.params.id);
    response.send({
        "id": 5,
        "cost": 8410,
        "description": "For sale",
    });
});

app.post('/ads', (request, response) => {
    // insert
    response.send({
        "id": 3,
        "cost": 47000,
        "description": "Audi A3",
    });
});

app.get('/ads', (request, response) => {
    const ads = [
        {
          "id": 1,
          "cost": 2000,
          "description": "asfasdf",
        },
        {
        "id": 2,
        "cost": 4000,
        },
    ];
    console.log(ads)
    response.send(ads);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});