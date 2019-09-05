import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IGameData } from '../../models/game-file';

@Component({
    selector: 'btg-json-dialog',
    templateUrl: 'game-json-dialog.component.html'
})

export class GameJsonDialogComponent {
    constructor(public dialogRef: MatDialogRef<GameJsonDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IGameData) { }

    onDone() {
        this.dialogRef.close();
    }
}
