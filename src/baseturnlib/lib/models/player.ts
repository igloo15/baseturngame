
export class Player {
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
    }

    getProp<T>(key: string): T {
        return this.playerProps[key] as T;
    }
}
