import { Injectable } from '@angular/core';
import { TurnLoop, Player, GameUtil } from 'baseturnlib';

@Injectable({
  providedIn: 'root'
})
export class DiceGameService {

  public looper: TurnLoop;
  public playerOne: Player;
  public playerTwo: Player;

  playerOneRoll = -1;
  playerTwoRoll = -1;

  constructor() {
    this.looper = new TurnLoop();
    this.playerOne = new Player('One');
    this.playerTwo = new Player('Two');

    this.looper.addPlayer(this.playerOne);
    this.looper.addPlayer(this.playerTwo);
    this.looper.takeTurn();
  }

  roll() {
    const rollValue = GameUtil.rollDice(4, 1, 0)[0];
    console.log(`Roll : ${rollValue}`);
    if(this.looper.currentPlayer == this.playerOne) {
      console.log(`Current Value ${this.playerOneRoll}`);
      this.playerOneRoll = rollValue;
    } else {
      console.log(`Current Value ${this.playerTwoRoll}`);
      this.playerTwoRoll = rollValue;
    }
  }
}
