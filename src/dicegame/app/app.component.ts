import { Component } from '@angular/core';
import { Hotkeys } from 'baseturnlib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'baseturn-game';

  constructor(private hotkeyService: Hotkeys) {

  }
}
