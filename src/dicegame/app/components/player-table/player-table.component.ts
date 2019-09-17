import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dg-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {

  public waitingpieces: number[] = [1, 2, 3, 4, 5, 6, 7];
  public completepiecies: number[] = [];

  @Input() name:string;
  
  constructor() { }

  ngOnInit() {
  }

}
