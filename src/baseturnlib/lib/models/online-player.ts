import { Player } from './player';
import { Guid } from 'guid-typescript';

export class OnlinePlayer extends Player {
    constructor(id: Guid, name?: string, team?: string, role?: string) {
        super(name, team, role);
        this.id = id;
    }
}
