import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dg-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {

  @Input() name:string;
  
  constructor() { }

  ngOnInit() {
  }

}
