import { Injectable } from '@angular/core';
import { GameStorageService } from './game-storage.service';
import { GameFile } from '../models/game-file';
import { NGXLogger } from 'ngx-logger';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public saveFile: GameFile;

  constructor(private gameStorage: GameStorageService, private logger: NGXLogger, private dialog: MatDialog) {
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
          confirmationTitle: confirmationTitle,
          confirmationText: confirmationText,
          completeText: completeText,
          cancelText: cancelText
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

}
