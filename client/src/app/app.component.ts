import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateTimerDialogComponent } from './create-timer-dialog/create-timer-dialog.component';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Timer';
  data = false;
  dataSource;
  timeDisplay = "";
  timeEndDisplay = "";
  timerArray = [];
  timercount

  constructor(public dialog: MatDialog, public timerService : TimerService) {
     this.timercount = 0;
     console.log('get',timerService.getTimerSeconds)
  }

  openDialog(){
    const dialogRef = this.dialog.open(CreateTimerDialogComponent, {
      height: '200px',
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource = result
      
       if(result.data > 0){
         this.timercount++
         this.timerArray.push({id:this.timercount,val:result.data,dis:"",status:true})
         this.startTimer(result.data,this.timercount)
         let data = {"id":this.timercount,"minute":result.data}
         this.timerService.createTimer(data).subscribe(result =>{
           console.log('createserviceresult',result)
         })
       }
       
    });
  }
  
  startTimer(minute: number,timercount){
    let minutes = minute
    let counter = 60 * minutes
    let i = 59;

      minutes = minutes - 1

    const interval = setInterval(() => {
      if(minutes < 0) {
        clearInterval(interval);
        
      }
      counter = counter - 1
      if(i < 0 && minutes >= 0){
        i=59
        minutes = minutes - 1
      }

      
      this.timeEndDisplay = "Timer " + timercount + " :-  " + minutes + ":" + i--
      this.timerArray[timercount-1].dis = this.timeEndDisplay
      if (counter == 0 ) {
        clearInterval(interval);
        this.timerArray[timercount-1].status = false;
      }
    }, 1000);
    
  }

}
