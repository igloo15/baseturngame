import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'btl-dice-dialog',
  templateUrl: './dice-dialog.component.html',
  styleUrls: ['./dice-dialog.component.scss']
})
export class DiceDialogComponent implements OnInit {

  private rolledDice: number[];
  public rollingDice: boolean;
  public maxValue = 6;
  public numberOfDice = 1;
  public duration = 10000;
  

  constructor(public dialogRef: MatDialogRef<DiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { 
      if(data.maxValue) {
        this.maxValue = data.maxValue;
      }
      if(data.numberOfDice) {
        this.numberOfDice = data.numberOfDice;
      }
      if(data.duration) {
        this.duration = data.duration;
      }
    }

  ngOnInit() {
  }

  onRoll() {
    this.rollingDice = false;
    setTimeout(() => {
      this.rollingDice = true;
    });
  }

  onRolled(dice: number[]) {
    this.rolledDice = dice;
  }

  onDone() {
    this.dialogRef.close(this.rolledDice);
  }

}
