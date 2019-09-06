import { Guid } from 'guid-typescript';

export interface IGameData {
    key: string;
}

export class GameFile implements IGameData {
    public key = 'game-file';
    public id: Guid;
    public name = '';
    public lastSave = new Date();

    constructor() {
        this.id = Guid.create();
    }
}
