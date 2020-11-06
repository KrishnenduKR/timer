import * as bodyParser from "body-parser";
import express = require('express');
class Timer{

    public express: express.Application;

    public secondsArr : number[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.secondsArr = [];
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.get("/timers", (req, res, next) => {
            res.json(this.secondsArr);
        });

        this.express.post("/timer", (req, res, next) => {
            this.startTimer(req.body);
           // res.json();
        });
    }

    startTimer(data:any){
        let minute = data.minute
        let id = this.secondsArr.length
        let seconds  = minute * 60
    
            const interval = setInterval(() => {
                seconds--
                this.secondsArr[id] = seconds
                if (seconds == 0 ) {
                    clearInterval(interval);
                  }
            }, 1000);
         
      }
}

export default new Timer().express;