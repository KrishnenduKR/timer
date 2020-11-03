import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateTimerDialogComponent } from './create-timer-dialog/create-timer-dialog.component';

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

  constructor(public dialog: MatDialog) {
     this.timercount = 0;
  }

  openDialog(){
    const dialogRef = this.dialog.open(CreateTimerDialogComponent, {
      height: '200px',
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('res',result); 
      this.dataSource = result
      
       if(result.data > 0){
         this.timercount++
         this.timerArray.push({id:this.timercount,val:result.data,dis:""})
       }
       this.startTimer(result.data,this.timercount)
      this.startDisplay()
    });
  }
  
  startTimer(minute: number,timercount){
    let minutes = minute
    let counter = 60 * minutes
    let i = 59;
    console.log('minut',minutes)

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
        console.log('Ding!');
      }
    }, 1000);
    
  }

   startDisplay(){
     this.timeDisplay = "";
       for(let i=0; i<this.timercount;i++){
           this.timeDisplay += "Timer " + this.timerArray[i].id + " : "
       }

   }

}
