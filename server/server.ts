import express = require('express');
import cors from 'cors';
import {router} from './timer';
//import * as bodyParser from 'body-parser';
const bodyParser = require('body-parser');

const app = express()
    .use(cors())
    .use(router)
    .use(bodyParser)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));
    
    app.get('/', function (req, res) {
        res.send('Hello World!');
        });

app.listen(4201, function() {
  return console.log('My Node App listening on port 4201');
});