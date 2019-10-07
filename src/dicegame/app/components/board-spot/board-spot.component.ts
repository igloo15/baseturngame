import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface IBoardSpotData {
  columnName: string;
  player: number;
  index: number;
}

@Component({
  selector: 'dg-board-spot',
  templateUrl: './board-spot.component.html',
  styleUrls: ['./board-spot.component.scss']
})
export class BoardSpotComponent implements OnInit {

  @Input() spotId: string;
  @Input() isSpecial: boolean;
  hasPlayer: boolean;
  @Output() clicked = new EventEmitter<IBoardSpotData>();

  spotData: IBoardSpotData;

  constructor() { }

  ngOnInit() {
    const stringParts = this.spotId.split('-');
    if(stringParts.length === 2) {
      this.spotData = {
        columnName: stringParts[0],
        player: -1,
        index: +stringParts[1]
      };
    } else if(stringParts.length === 3) {
      this.spotData = {
        columnName: stringParts[0],
        player: +stringParts[1],
        index: +stringParts[2]
      };
    }
  }

  onClick() {
    this.clicked.emit(this.spotData);
  }

}
