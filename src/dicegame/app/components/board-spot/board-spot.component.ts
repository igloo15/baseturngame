import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DiceGameService } from '../../services/dice-game.service';
import { Piece } from '../../models/piece';

export interface IBoardSpotData {
  columnName: string;
  piece?: Piece;
  index: number;
  active: boolean;
}

@Component({
  selector: 'dg-board-spot',
  templateUrl: './board-spot.component.html',
  styleUrls: ['./board-spot.component.scss']
})
export class BoardSpotComponent implements OnInit {

  @Input() spotId: string;
  @Input() isSpecial: boolean;
  @Input() isHome: boolean;
  @Input() isEnd: boolean;
  @Output() clicked = new EventEmitter<IBoardSpotData>();

  spotData: IBoardSpotData;

  constructor(private diceGameService: DiceGameService) {
  }

  ngOnInit() {
    const stringParts = this.spotId.split('-');
    if (stringParts.length === 2) {
      this.spotData = {
        columnName: stringParts[0],
        index: +stringParts[1],
        active: false
      };
    } else if (stringParts.length === 3) {
      this.spotData = {
        columnName: `${stringParts[0]}-${stringParts[1]}`,
        index: +stringParts[2],
        active: false
      };
    }

    this.diceGameService.registerBoardPiece(this.spotData);
  }

  onClick() {
    this.clicked.emit(this.spotData);
  }

}
