import { Player } from './player';

export class AIPlayer extends Player {

    constructor(name?: string, team?: string, role?: string) {
        super(name, team, role);
    }
}