"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = __importStar(require("body-parser"));
var express = require("express");
var Timer = /** @class */ (function () {
    function Timer() {
        this.express = express();
        this.middleware();
        this.routes();
        this.secondsArr = [];
    }
    // Configure Express middleware.
    Timer.prototype.middleware = function () {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    };
    Timer.prototype.routes = function () {
        var _this = this;
        this.express.get("/timers", function (req, res, next) {
            res.json(_this.secondsArr);
        });
        this.express.post("/timer", function (req, res, next) {
            console.log('reqbody', typeof (req.body));
            _this.startTimer(req.body);
            // res.json();
        });
    };
    Timer.prototype.startTimer = function (data) {
        var _this = this;
        var minute = data.minute;
        var id = data.id;
        var seconds = minute * 60;
        var interval = setInterval(function () {
            seconds--;
            _this.secondsArr[id - 1] = seconds;
            if (seconds == 0) {
                clearInterval(interval);
                console.log('Ding!');
            }
        }, 1000);
    };
    return Timer;
}());
exports.default = new Timer().express;
