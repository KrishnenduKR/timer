"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors_1 = __importDefault(require("cors"));
var timer_1 = require("./timer");
//import * as bodyParser from 'body-parser';
var bodyParser = require('body-parser');
var app = express()
    .use(cors_1.default())
    .use(timer_1.router)
    .use(bodyParser)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(4201, function () {
    return console.log('My Node App listening on port 4201');
});
