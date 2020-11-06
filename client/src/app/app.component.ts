import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTimerDialogComponent } from './create-timer-dialog/create-timer-dialog.component';
import { TimerService } from './timer.service';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'Timer';
  data = false;
  dataSource;
  timeDisplay = "";
  timeEndDisplay = "";
  timerArray = [];
  timercount

  subscription: Subscription;
  browserRefresh = false;
  secondsArr: number[];

  constructor(public dialog: MatDialog, public timerService: TimerService, private router: Router) {
    this.timercount = 0;

    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.browserRefresh = !router.navigated;
        timerService.getTimerSeconds().subscribe(seconds => {
          this.secondsArr = seconds
          this.startAfterRefresh(this.secondsArr)
        })
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateTimerDialogComponent, {
      height: '200px',
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource = result

      if (result.data > 0) {
        this.timercount++
        this.timerArray.push({ id: this.timercount, val: result.data, dis: "", status: true })
        this.startTimer(result.data, this.timercount)
        let data = { "id": this.timercount, "minute": result.data }
        this.timerService.createTimer(data).subscribe(result => {
          console.log('createserviceresult', result)
        })
      }

    });
  }

  startTimer(minute: number, timercount) {
    let minutes = minute
    let counter = 60 * minutes
    let i = 59;

    minutes = minutes - 1

    const interval = setInterval(() => {
      if (minutes < 0) {
        clearInterval(interval);

      }
      
      if (i < 0 && minutes >= 0) {
        i = 59
        minutes = minutes - 1
      }

      
      this.timeEndDisplay = "Timer " + timercount + " :-  " + minutes + ":" + i--
      this.timerArray[timercount - 1].dis = this.timeEndDisplay
      counter = counter - 1
      if (counter == 0) {
        clearInterval(interval);
        this.timerArray[timercount - 1].status = false;
      }
    }, 1000);

  }

  startAfterRefresh(secondArr) {
    for (let i = 0; i < secondArr.length; i++) {
      let second;
      let minute;
      this.timercount++
      let counter = secondArr[i]
      this.timerArray.push({ id: i, val: counter, dis: "", status: true })


      if (secondArr[i] == 0) {
        minute = 0
        second = 0
        this.timeEndDisplay = "Timer " + (i + 1) + " :-  " + minute + ":" + second
        this.timerArray[i].dis = this.timeEndDisplay
        this.timerArray[i].status = false;
      }
      else if (secondArr[i] != 0 && secondArr[i] < 60) {
        second = secondArr[i] - 1
        minute = 0
      }
      else {
        second = (secondArr[i] % 60) - 1
        minute = Math.floor(secondArr[i] / 60)
      }

      const interval = setInterval(() => {
        if (minute < 0) {
          clearInterval(interval);
        }
        
        if (second < 0 && minute >= 0) {
          second = 59
          minute = minute - 1
        }
        this.timeEndDisplay = "Timer " + (i + 1) + " :-  " + minute + ":" + second--
        this.timerArray[i].dis = this.timeEndDisplay
        counter = counter - 1
        if (counter == 0 || counter < 0) {
          clearInterval(interval);
          this.timerArray[i].status = false;
        }
      }, 1000)
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
