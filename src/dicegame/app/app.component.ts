import { Component } from '@angular/core';
import { Hotkeys, DiceDialogComponent, GameService, GameServerService } from 'baseturnlib';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { DiceGameService } from './services/dice-game.service';
import { Piece } from './models/piece';
import { IOnConnectEvent } from 'ngx-mqtt';

@Component({
  selector: 'dg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'baseturn-game';

  disableRolling = false;
  disableNextTurn = true;

  constructor(private hotkeyService: Hotkeys, private dialog: MatDialog, public diceGameService: DiceGameService,
              public gameService: GameService, public gameServer: GameServerService) {

  }

  openDiceRoller() {
    this.diceGameService.roll();
    this.disableRolling = true;
    this.disableNextTurn = false;
  }

  nextTurn() {
    const confirmAction = this.diceGameService.looper.endTurn();
    this.gameService.openConfirmationWindow(`End Turn Player ${this.diceGameService.looper.currentPlayer.name}?`).then(
      result => {
        if (result) {
          const playerTwoStart = confirmAction();
          this.gameService.openConfirmationWindow(`Player ${this.diceGameService.looper.getNextPlayer().name} are you ready?`, 'Yes', 'No')
          .then(startResult => {
              if (startResult) {
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
    // this.gameService.openConnectionWindow('ws://broker.hivemq.com:8000/mqtt', 'myGame');
  }
}
