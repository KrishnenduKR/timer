import { NextFunction, Request, Response, Router } from 'express';

export const router: Router = Router();

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

var secondsArr : number[] = [];

router.get('/timers', function (req: Request, res: Response, next: NextFunction) {
    try {
      res.send(secondsArr);
    }
    catch (err) {
      return next(err);
    }
  });

  router.post('/timer', function (req: Request, res: Response){
        console.log('serverreq',req.body)
        startTimer(req.body.data)
        return secondsArr;
  });

  function startTimer(data:any){
    let minute = data.minute
    let id = data.id
    let seconds  = minute * 60

        const interval = setInterval(() => {
            seconds--
            secondsArr[id-1] = seconds
            if (seconds < 0 ) {
                clearInterval(interval);
                console.log('Ding!');
              }
        }, 1000);
     
  }