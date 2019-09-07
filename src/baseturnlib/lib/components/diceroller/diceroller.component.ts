import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { GameUtil } from '../../models/utility';

@Component({
  selector: 'btl-diceroller',
  templateUrl: './diceroller.component.html',
  styleUrls: ['./diceroller.component.scss']
})
export class DicerollerComponent implements OnInit, AfterViewInit {

  public diceRoll: number[];

  @Input() maxValue = 6;
  @Input() numberOfDice = 1;
  @Input() duration = 10000;
  @Output() diceRolled = new EventEmitter<number[]>();

  constructor() { 
    
  }

  ngOnInit() {
    this.diceRoll = GameUtil.rollDice(this.maxValue, this.numberOfDice);
    this.diceRolled.emit(this.diceRoll);
  }

  ngAfterViewInit() {
    
  }
}
