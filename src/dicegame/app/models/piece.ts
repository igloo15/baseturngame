import { Player } from 'baseturnlib';

export class Piece {
    columnName: string;
    index: number;
    color: string;
    active: boolean;
    player: Player;

    constructor(player: Player) {
        this.player = player;
    }
}
