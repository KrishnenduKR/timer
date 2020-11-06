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
const bodyParser = __importStar(require("body-parser"));
const express = require("express");
class Timer {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.secondsArr = [];
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        this.express.get("/timers", (req, res, next) => {
            res.json(this.secondsArr);
        });
        this.express.post("/timer", (req, res, next) => {
            this.startTimer(req.body);
            // res.json();
        });
    }
    startTimer(data) {
        let minute = data.minute;
        let id = this.secondsArr.length;
        let seconds = minute * 60;
        const interval = setInterval(() => {
            seconds--;
            this.secondsArr[id] = seconds;
            if (seconds == 0) {
                clearInterval(interval);
            }
        }, 1000);
    }
}
exports.default = new Timer().express;
