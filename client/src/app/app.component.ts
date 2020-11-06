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
          this.onloadTimer(this.secondsArr)
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

        let nTime= (result.data*60) - 1;
        let minutes = Math.floor(nTime/ 60)
        let seconds = nTime - minutes * 60;
         this.timerArray.push({dis: minutes+":"+seconds})
         let data = {"minute": result.data }
         this.timerService.createTimer(data).subscribe(result => {
           console.log('createserviceresult', result)
         })   
         this.addTimer(nTime);   
      }
    });
  }


  addTimer(nTime) {
      let minutes = Math.floor(nTime/ 60)
      let seconds = nTime - minutes * 60;

        let i = this.timerArray.length -1;
        const interval = setInterval(() => {    
          nTime--;
          minutes = Math.floor(nTime/ 60)
          seconds = nTime - minutes * 60;
          this.timerArray[i].dis = minutes+":"+seconds;
          if (nTime == 0) {
            clearInterval(interval);
          }
        }, 1000)

  }

  onloadTimer(tArray){

    for (let i = 0; i < tArray.length; i++) {
      let nTime= tArray[i];
      let minutes = Math.floor(tArray[i]/ 60)
      let seconds = tArray[i] - minutes * 60;

    this.timerArray.push({dis: minutes+":"+seconds})
     if(tArray[i]!=0){
        const interval = setInterval(() => {    
          nTime--;
          minutes = Math.floor(nTime/ 60)
          seconds = nTime - minutes * 60;
          this.timerArray[i].dis = minutes+":"+seconds;
          if (nTime == 0) {
            clearInterval(interval);
          }
        }, 1000)
      }    
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}