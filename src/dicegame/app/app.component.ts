import { Component } from '@angular/core';
import { Hotkeys, DiceDialogComponent, GameService } from 'baseturnlib';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { DiceGameService } from './services/dice-game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'baseturn-game';

  disableRolling = false;
  disableNextTurn = true;

  constructor(private hotkeyService: Hotkeys, private dialog: MatDialog, public diceGameService: DiceGameService, public gameService: GameService) {

  }

  openDiceRoller(){
    this.diceGameService.roll();
    this.disableRolling = true;
    this.disableNextTurn = false;
  }

  nextTurn() {
    const confirmAction = this.diceGameService.looper.endTurn();
    this.gameService.openConfirmationWindow(`End Turn Player ${this.diceGameService.looper.currentPlayer.name}?`).then(
      result => {
        if(result) {
          const playerTwoStart = confirmAction();
          this.gameService.openConfirmationWindow(`Player ${this.diceGameService.looper.getNextPlayer().name} are you ready?`, 'Yes', 'No').then(
            startResult => {
              if(startResult) {
                playerTwoStart();
                this.disableRolling = false;
                this.disableNextTurn = true;
              }
            }
          );
          console.log('next turn');
        }
      }
    );
    
  }
}
