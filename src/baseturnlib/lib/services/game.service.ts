import { Injectable } from '@angular/core';
import { GameStorageService } from './game-storage.service';
import { GameFile } from '../models/game-file';
import { NGXLogger } from 'ngx-logger';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { take } from 'rxjs/operators';
import { GameJoinerDialogComponent } from '../components/game-joiner-dialog/game-joiner-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public saveFile: GameFile;
  public connectedOnline: boolean;

  constructor(private gameStorage: GameStorageService, private logger: NGXLogger,
              private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.saveFile = gameStorage.getFile();
    this.logger.debug(this.saveFile);
  }

  save() {
    this.gameStorage.save(this.saveFile);
  }

  restart() {
    this.gameStorage.clear();
    this.saveFile = new GameFile();
    this.gameStorage.save(this.saveFile);
  }

  openConfirmationWindow(confirmationText: string, completeText = 'Confirm', cancelText = 'Cancel',
                         confirmationTitle?: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.dialog.open(ConfirmationDialogComponent, {
        hasBackdrop: true,
        disableClose: true,
        data: {
          confirmationTitle,
          confirmationText,
          completeText,
          cancelText
        }
      }).afterClosed().pipe(take(1)).subscribe(result => {
        if (result === completeText) {
          resolve(true);
        } else if (result === cancelText) {
          resolve(false);
        } else {
          reject('bad stuff happened');
        }
      });
    });
  }

  openConnectionWindow(defaultServer: string, defaultGameId: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.dialog.open(GameJoinerDialogComponent, {
        hasBackdrop: true,
        disableClose: true,
        data: {
          defaultServer,
          defaultGameId
        }
      }).afterClosed().pipe(take(1)).subscribe(result => {
        if (result === 'connected') {
          resolve(true);
        } else if (result === 'disconnected') {
          resolve(false);
        }
        reject();
      });
    });
  }

  openMessage(message: string, dismissName = '', time = 5000) {
    this.snackBar.open(message, dismissName, {duration: time});
  }

}
