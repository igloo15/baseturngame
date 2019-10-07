import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Piece } from '../../models/piece';

@Component({
  selector: 'dg-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {

  public waitingpieces: Piece[] = [new Piece(), new Piece(), new Piece(), new Piece(), new Piece(), new Piece(), new Piece()];
  public completepieces: Piece[] = [];

  @Input() name:string;
  @Input() currentRoll: number;
  
  constructor() { }

  ngOnInit() {
  }

  onWaitPieceClick(piece: Piece) {
    console.log(piece);
  }

}
