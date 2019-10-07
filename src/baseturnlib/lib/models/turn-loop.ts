import { Player } from './player';
import { Subject } from 'rxjs';
import { GameUtil } from './utility';

export interface BetweenTurnEvent {
    endingTurnNumber: number;
    newTurnNumber: number;
    endingTurnPlayer: Player;
    newTurnPlayer: Player;
}

export interface TurnEvent {
    currentTurnNumber: number;
    currentPlayer: Player;
}

export class TurnLoop {
    public players: Player[] = [];
    public currentPlayer: Player;
    public turnNumber = 0;

    /**
     * The event occurs before the next play has started their turn
     * but after the previous play has finalized their turn
     */
    public preTurnEvent: Subject<BetweenTurnEvent> = new Subject<BetweenTurnEvent>();

    /**
     * The turn for a player has been accepted and started
     */
    public turnStartedEvent: Subject<TurnEvent> = new Subject<TurnEvent>();

    /**
     * The player's turn is over but has not be finalized by completing player
     */
    public postTurnEvent: Subject<BetweenTurnEvent> = new Subject<BetweenTurnEvent>();

    public endTurn(): () => any {
        this.postTurnEvent.next({
            endingTurnNumber: this.turnNumber,
            newTurnNumber: this.turnNumber + 1,
            endingTurnPlayer: this.currentPlayer,
            newTurnPlayer: this.getNextPlayer()
        });
        return () => this.finalizeEndTurn();
    }

    public finalizeEndTurn(): () => void {

        this.preTurnEvent.next({
            endingTurnNumber: this.turnNumber,
            newTurnNumber: this.turnNumber + 1,
            endingTurnPlayer: this.currentPlayer,
            newTurnPlayer: this.getNextPlayer()
        });

        return () => this.takeTurn();
    }

    public takeTurn() {
        if (this.currentPlayer) {
            this.currentPlayer.isTheirTurn = false;
        }
        this.currentPlayer = this.getNextPlayer();
        this.currentPlayer.isTheirTurn = true;
        this.turnNumber++;
        this.turnStartedEvent.next({
            currentTurnNumber: this.turnNumber,
            currentPlayer: this.currentPlayer
        });
    }

    public shufflePlayers() {
        this.players = GameUtil.randomizeArray<Player>(this.players);
        for(let i = 0; i < this.players.length; i++) {
            this.players[i].index = i + 1;
        }
    }

    public addPlayer(player: Player): TurnLoop {
        this.players.push(player);
        player.index = this.players.length;

        return this;
    }

    public getNextPlayer(): Player {
        return this.players[this.turnNumber % this.players.length];
    }
}
