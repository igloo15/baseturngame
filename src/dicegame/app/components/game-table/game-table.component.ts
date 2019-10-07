import { Component, OnInit } from '@angular/core';
import { IBoardSpotData } from '../board-spot/board-spot.component';

@Component({
  selector: 'dg-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss']
})
export class GameTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onClicked(data: IBoardSpotData) {
    console.log(data);
  }

}
