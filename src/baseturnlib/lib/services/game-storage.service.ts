import { Injectable } from '@angular/core';
import { GameFile, IGameData } from '../models/game-file';
import { NGXLogger } from 'ngx-logger';



@Injectable({
  providedIn: 'root'
})
export class GameStorageService {

  private file: GameFile;
  public readonly gameFileKey = 'gameFile';
  public saveDataKeys: string[] = [];


  constructor(private logger: NGXLogger) {
    this.initialize();
  }

  public getFile(): GameFile {
    if (this.file) {
      return this.file;
    }
    this.initialize();

    return this.file;
  }

  public initialize() {
  }

  save<T extends IGameData>(gameFile: T) {
    if (this.saveDataKeys.lastIndexOf(gameFile.key) < 0) {
      this.saveDataKeys.push(this.gameFileKey);
    }
    localStorage.setItem(gameFile.key, JSON.stringify(gameFile));
    this.logger.debug('game saved');
  }

  load<T extends IGameData>(key: string): T {
    const jsonData = localStorage.getItem(this.gameFileKey);
    if (jsonData) {
      const data = JSON.parse(jsonData);
      this.logger.debug('game loaded');
      return data;
    }
  }

  clear() {
    this.saveDataKeys.forEach(key => {
      localStorage.removeItem(this.gameFileKey);
    });
  }
}
