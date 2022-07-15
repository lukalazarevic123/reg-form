const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');

const dbController = require('./controller/dbController.js');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

function server(){
    app.use(cors());
    app.use(express.json());
    app.use(routes);

    dbController.connectDb((err) => {
        if(err) return;
    })

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    })
}

server();