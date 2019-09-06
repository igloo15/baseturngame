import { Player } from './player';

export class Team {
    public name: string;
    public players: Player[] = [];
    public teamProps: { [propKey: string]: string } = {};
}
