import { Guid } from 'guid-typescript';

export class Player {
    public id: Guid;
    public name: string;
    public isTheirTurn: boolean;
    public team: string;
    public role: string;
    public index: number;
    public playerProps: { [propKey: string]: any } = {};

    /**
     * Constructs a player
     * @param name The name of the player
     */
    constructor(name?: string, team?: string, role?: string) {
        this.name = name;
        this.team = team;
        this.role = role;
        this.id = Guid.create();
    }

    getProp<T>(key: string): T {
        return this.playerProps[key] as T;
    }
}
