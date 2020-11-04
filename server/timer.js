"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
exports.router = express_1.Router();
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
var secondsArr = [];
exports.router.get('/timers', function (req, res, next) {
    try {
        res.send(secondsArr);
    }
    catch (err) {
        return next(err);
    }
});
exports.router.post('/timer', function (req, res) {
    console.log('serverreq', req.body);
    startTimer(req.body.data);
    return secondsArr;
});
function startTimer(data) {
    var minute = data.minute;
    var id = data.id;
    var seconds = minute * 60;
    var interval = setInterval(function () {
        seconds--;
        secondsArr[id - 1] = seconds;
        if (seconds < 0) {
            clearInterval(interval);
            console.log('Ding!');
        }
    }, 1000);
}
