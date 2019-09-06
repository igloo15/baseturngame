
export class Player {
    public name: string;
    public isTheirTurn: boolean;
    public team: string;
    public role: string;
    public playerProps: { [propKey: string]: string } = {};
}
