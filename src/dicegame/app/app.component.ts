import { Component } from '@angular/core';
import { Hotkeys, DiceDialogComponent } from 'baseturnlib';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'baseturn-game';

  constructor(private hotkeyService: Hotkeys, private dialog: MatDialog) {

  }

  openDiceRoller(){
    this.dialog.open(DiceDialogComponent, {
      width: '500px',
      data: {
        maxValue: 22,
        numberOfDice: 7
      }
    }).afterClosed().pipe(take(1)).subscribe(result => {
      console.log(result);
    });
  }
}
