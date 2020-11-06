import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-timer-dialog',
  templateUrl: './create-timer-dialog.component.html',
  styleUrls: ['./create-timer-dialog.component.scss']
})
export class CreateTimerDialogComponent implements OnInit {
  minuteVal;

  constructor( public dialogRef: MatDialogRef<CreateTimerDialogComponent>) { }

  ngOnInit(): void {
  }

  onClose(): void{
    this.dialogRef.close({data:this.minuteVal})
  }

  onAdd(val){
    this.minuteVal = val;
    this.dialogRef.close({data:this.minuteVal})
  }

}
