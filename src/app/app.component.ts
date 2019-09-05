import { Component } from '@angular/core';
import { Hotkeys } from './services/hotkeys.service';
import '../assets/test.svg';

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
