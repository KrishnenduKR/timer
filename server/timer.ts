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
            console.log('reqbody',typeof (req.body))
            this.startTimer(req.body);
           // res.json();
        });
    }

    startTimer(data:any){
        let minute = data.minute
        let id = data.id
        let seconds  = minute * 60
    
            const interval = setInterval(() => {
                seconds--
                this.secondsArr[id-1] = seconds
                if (seconds < 0 ) {
                    clearInterval(interval);
                    console.log('Ding!');
                  }
            }, 1000);
         
      }
}

export default new Timer().express;