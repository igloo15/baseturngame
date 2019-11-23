import { Component, OnInit, Inject } from '@angular/core';
import { GameServerService } from '../../services/game-server.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'btl-game-joiner-dialog',
  templateUrl: './game-joiner-dialog.component.html',
  styleUrls: ['./game-joiner-dialog.component.scss']
})
export class GameJoinerDialogComponent implements OnInit {

  gameServerUrl: string;
  gameId: string;

  constructor(public dialogRef: MatDialogRef<GameJoinerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              public gameServer: GameServerService) {
    this.gameServerUrl = data.defaultServer;
    this.gameId = data.defaultGameId;
  }

  ngOnInit() {

  }

  onConnect() {
    this.gameServer.start(this.gameServerUrl, this.gameId);
    this.dialogRef.close('connected');
  }

  onDisconnect() {
    this.gameServer.stop();
    this.dialogRef.close('disconnected');
  }

  onCancel() {
    this.dialogRef.close('cancel');
  }

}
