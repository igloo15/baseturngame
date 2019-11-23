import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'baseturnlib';
import { Piece } from '../../models/piece';
import { DiceGameService } from '../../services/dice-game.service';
import { DiceGameUtil } from '../../models/utility';

@Component({
  selector: 'dg-game-piece',
  templateUrl: './game-piece.component.html',
  styleUrls: ['./game-piece.component.scss']
})
export class GamePieceComponent implements OnInit {

  @Input() piece: Piece;

  constructor(public diceGameService: DiceGameService) { }

  ngOnInit() {
  }

  makeActive(piece: Piece) {
    if (this.piece.player.isTheirTurn && this.diceGameService.piecePicking) {
      const currentStatus = this.piece.active;
      DiceGameUtil.clearActivePieces(this.piece.player);
      this.piece.active = !currentStatus;
      this.diceGameService.togglePiece(piece);
    }
  }

}
